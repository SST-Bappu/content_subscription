import {ContentRepository} from "../repositories/contentRepository";
import {CategoryRepository} from "../repositories/categoryRepository";
import {ContentService} from "../services/contentService";

async function storeContentCronJob() {
    const contentRepo = new ContentRepository()
    const categoryRepo = new CategoryRepository()

    const contentService = new ContentService(contentRepo, categoryRepo)
    console.log('Fetching contents from dummy json.......')
    try {
        await contentService.fetchAndStoreContent()
        console.log('Content fetching completed !')
    } catch (error) {
        console.error("Error in cron job:", error);
    }
}


storeContentCronJob()