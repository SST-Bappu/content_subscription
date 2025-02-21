import {CategoryRepository} from "@/repositories/categoryRepository";

export class CategoryService {

    /**
     * Get all categories (Future: Add filtering, sorting, etc.).
     */
    static async getAllCategories() {
        const categories = await CategoryRepository.getAllCategories();

        return {status: 200, data: {categories}}
    }
}