import { Arg, Ctx, Mutation, Resolver, Query } from 'type-graphql';
import { MyContext } from "src/types";
import { Image } from '../entities/Image';
import { v2 as cloudinary } from 'cloudinary';

@Resolver()
export class ImageResolver {
    @Mutation(() => Image)
    async createImage(
        @Arg("imagename") imagename: string,
        @Arg("imagePath") imagePath: string,
        @Ctx() { em }: MyContext
    ): Promise<Image> {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: 'nodeblog',
        });

        const image = em.create(Image, {
            imagename,
            imageUrl: result.secure_url, 
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await em.persistAndFlush(image);
        return image;
    }

    @Query(() => [Image])
    async getImages(@Ctx() { em }: MyContext): Promise<Image[]> {
        const images = await em.find(Image, {}, { populate: ['likes'] });

        const imagesWithLikeCount = images.map((image) => ({
            ...image,
            likeCount: image.likes.length 
        }));

        return imagesWithLikeCount;
    }
}
