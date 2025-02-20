import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

export class CategoryRepository {
    /**
     * Get all categories.
     * @returns A list of categories.
     */
    static async getAllCategories(): Promise<Category[]> {
        return prisma.category.findMany();
    }

    /**
     * Get a category by ID.
     * @param id - The category ID.
     * @returns The category object or null if not found.
     */
    static async getCategoryById(id: string): Promise<Category | null> {
        return prisma.category.findUnique({where: {id}});
    }
}
