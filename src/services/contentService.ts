import {ContentRepository} from "../repositories/contentRepository";
import {CategoryRepository} from "../repositories/categoryRepository";
import {fetchFromAPI} from "../utils/apiClient";


export class ContentService{
    constructor(private contentRepository: ContentRepository, private categoryRepository: CategoryRepository){}
    async fetchAndStoreContent() {

        const categories = await this.categoryRepository.getAllCategories();

        for (const category of categories) {
            const apiUrl =  process.env.DUMMY_JSON_URL as string;
            const data = await fetchFromAPI(apiUrl+category.name);

            if (data && data.products) {
                for (const product of data.products) {
                    await this.contentRepository.storeContent(product.title, product.description, category.id);
                }
            }
        }
    }
};
