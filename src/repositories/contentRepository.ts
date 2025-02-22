import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ContentRepository {
    async storeContent(title: string, description: string, categoryId: string) {
        return prisma.content.create({
            data: {title, description, categoryId},
        });
    }

    async getContentsByCategory(categoryId: string) {
        return prisma.content.findMany({where: {categoryId}});
    }
};