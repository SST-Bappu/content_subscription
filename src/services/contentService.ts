import {ContentRepository} from "../repositories/contentRepository";
import {CategoryRepository} from "@/repositories/categoryRepository";
import {fetchFromAPI} from "@/utils/apiClient";
import {UserRepository} from "@/repositories/userRepository";
import {EmailService} from "@/services/emailService";
import {Category} from "@prisma/client";


export class ContentService {
    constructor(private contentRepository: ContentRepository, private categoryRepository: CategoryRepository) {
    }

    async fetchAndStoreContent() {

        const categories = await this.categoryRepository.getAllCategories();

        for (const category of categories) {
            const apiUrl = process.env.DUMMY_JSON_URL as string;
            const data = await fetchFromAPI(apiUrl + category.name);

            if (data && data.products) {
                for (const product of data.products) {
                    await this.contentRepository.storeContent(product.title, product.description, category.id);
                }
            }
        }
    }
}

export class WeeklyDigestService {
    constructor(
        private userRepo: UserRepository,
        private contentRepo: ContentRepository,
        private emailService: EmailService
    ) {
    }

    async sendWeeklyDigest() {
        const users = await this.userRepo.getAllUsers()
        if (!users) {
            throw {status: 401, message: "Unauthorized: User not found"}
        }
        for (const user of users) {
            const categoryIds: string[] = user.categories.map((category: Category) => category.id as string);
            const contents = await this.contentRepo.getLastWeekContentByCategories(categoryIds)
            const emailData = {
                email: user.email,
                name: user.name,
                contents: contents
            }
            await this.emailService.sendEmail(emailData, 'digest')

        }
    }
}
