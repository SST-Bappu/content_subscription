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

    /**
     * Find max 3 contents of last week for weekly digest.
     * @param categoryIds - list of category ids.
     * @returns The list of contents of
     */
    async getLastWeekContentByCategories(categoryIds: string[]){
        if (!categoryIds || categoryIds.length === 0) {
            return []; //Return an empty array instead of querying this.prisma
        }

        return this.prisma.content.findMany({
            where: {
                categoryId: { in: categoryIds },
                createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Last 7 days
            },
            orderBy: { createdAt: "desc" },
            take: 3, // Max 3 articles per category
            select: {
                title: true,  // Only fetch the title field
            },
        });
    }

};