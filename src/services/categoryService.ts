import {CategoryRepository} from "@/repositories/categoryRepository";

export class CategoryService {

    constructor(private categoryRep: CategoryRepository) {
    }

    /**
     * Get all categories (Future: Add filtering, sorting, etc.).
     */
    async getAllCategories() {
        const categories = await this.categoryRep.getAllCategories();

        return {status: 200, data: {categories}}
    }
}