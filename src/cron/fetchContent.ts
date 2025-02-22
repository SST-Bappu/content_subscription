import {ContentRepository} from "@/repositories/contentRepository";
import {CategoryRepository} from "@/repositories/categoryRepository";
import {ContentService} from "@/services/contentService";
import {PrismaClient} from "@prisma/client";

async function storeContentCronJob() {
    const prisma = new PrismaClient()
    const contentRepo = new ContentRepository(prisma)
    const categoryRepo = new CategoryRepository(prisma)

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