import { PrismaClient, Category } from '@prisma/client';


export class CategoryRepository {

    constructor(private prisma: PrismaClient) {
    }
    /**
     * Get all categories.
     * @returns A list of categories.
     */
    async getAllCategories(): Promise<Category[]> {
        return this.prisma.category.findMany();
    }

    /**
     * Get a category by ID.
     * @param id - The category ID.
     * @returns The category object or null if not found.
     */
    async getCategoryById(id: string): Promise<Category | null> {
        return this.prisma.category.findUnique({where: {id}});
    }
}
