import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ContentRepository {
    async storeContent(title: string, description: string, categoryId: string) {
        return prisma.content.create({
            data: {title, description, categoryId},
        });
    }

    async getContentsByCategories(categoryIds: string[]) {
        if (!categoryIds || categoryIds.length === 0) {
            return []; //Return an empty array instead of querying Prisma
        }
        return prisma.content.findMany({where: {categoryId: {in : categoryIds}}});
    }

};