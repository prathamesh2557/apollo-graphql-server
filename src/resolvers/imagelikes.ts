import { Resolver, Mutation, Arg, Int, Ctx, Query } from 'type-graphql';
import { ImageLike } from '../entities/ImagesLikes';
import { MyContext } from '../types';

@Resolver()
export class ImageLikeResolver {

  @Query(() => Int)
  async likeCount(
    @Arg("imageId", () => Int) imageId: number,
    @Ctx() { em }: MyContext
  ): Promise<number> {
    // Count all likes for the specified image
    const count = await em.count(ImageLike, { image: imageId });
    return count;
  }

  @Mutation(() => Boolean)
  async likeImage(
    @Arg("imageId", () => Int) imageId: number,
    @Ctx() { em, req }: MyContext
  ): Promise<boolean> {
    const userId = req.session.userId;
    if (!userId) throw new Error("Not authenticated");

    // Check if the user has already liked this image
    const existingLike = await em.findOne(ImageLike, { user: userId, image: imageId });
    if (existingLike) {
        throw new Error("Already liked this image");
    }

    // Create the like
    const imageLike = em.create(ImageLike, { user: userId, image: imageId });
    await em.persistAndFlush(imageLike);
    return true;
}

@Mutation(() => Boolean)
async unlikeImage(
    @Arg("imageId", () => Int) imageId: number,
    @Ctx() { em, req }: MyContext
): Promise<boolean> {
    const userId = req.session.userId;
    if (!userId) throw new Error("Not authenticated");

    // Check if the user has liked this image
    const like = await em.findOne(ImageLike, { user: userId, image: imageId });
    if (!like) {
        throw new Error("Image is not liked yet");
    }

    // Remove the like
    await em.removeAndFlush(like);
    return true;
}

}
