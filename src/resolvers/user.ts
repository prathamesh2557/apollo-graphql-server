import { User } from '../entities/User';
import { MyContext } from "src/types";
import { Resolver, InputType, Arg, Field, Ctx, Mutation, ObjectType, Query } from "type-graphql";
import argon2 from 'argon2';
import { COOKIE_NAME } from '../constants';

@InputType() 
class UserPasswordInput {
    @Field()
    username!: string;
    @Field()
    password!: string;
}

export @ObjectType()
class FieldError {
    @Field()
    field!: string;
    @Field()
    message!: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {
    @Query(()=> User, {nullable: true})
    async me(
      @Ctx() { req,em }: MyContext
    ) {
      if (!req.session.userId){
        return null
      }
      const user = await em.findOne(User, {id: req.session.userId});
      return user;
    } 
    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UserPasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        const existingUser = await em.findOne(User, { username: options.username });
        if (existingUser) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "username already taken",
                    },
                ],
            };
        }
        if (options.username.length <= 3) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "username is too short",
                    },
                ],
            };
        }
        if (options.password.length <= 5) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "password is too short",
                    },
                ],
            };
        }
        const hashedPassword = await argon2.hash(options.password);
        const user = em.create(User, {  
            username: options.username,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    
            await em.persistAndFlush(user);
    
        return { user };
    }


    @Mutation(() => UserResponse)
    async login(
      @Arg("options") options: UserPasswordInput,
      @Ctx() { em,req }: MyContext
    ): Promise<UserResponse> {
      const user = await em.findOne(User, { username: options.username });
      if (!user) {
        return {
          errors: [
            {
              field: "username",
              message: "username doesn't exist",
            },
          ],
        };
      }
      const valid = await argon2.verify(user.password, options.password);
      if (!valid) {
        return {
          errors: [
            {
              field: "password",
              message: "incorrect password",
            },
          ],
        };
      }

      req.session.userId = user.id;
      req.session.regenerate;
      console.log('Session after login:', req.sessionID, req.session);

      return { user };
    }

    @Query(() => [User])
    async getUser(
        @Ctx() { em }: MyContext
    ): Promise<User[]> {
        return em.find(User, {});
    }

    @Mutation(()=> Boolean)
    logout(@Ctx() {req,res}: MyContext) {
      return new Promise((resolve) => 
      req.session.destroy((err)=> {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      }) 
      );
    }

}
