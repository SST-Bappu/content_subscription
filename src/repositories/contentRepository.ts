import { PrismaClient } from "@prisma/client";


export class ContentRepository {
    constructor(private prisma: PrismaClient) {
    }
    async storeContent(title: string, description: string, categoryId: string) {
        return this.prisma.content.create({
            data: {title, description, categoryId},
        });
    }

    async getContentsByCategories(categoryIds: string[]) {
        if (!categoryIds || categoryIds.length === 0) {
            return []; //Return an empty array instead of querying this.prisma
        }
        return this.prisma.content.findMany({where: {categoryId: {in : categoryIds}}});
    }

};