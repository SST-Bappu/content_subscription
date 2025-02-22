import {PrismaClient, User} from '@prisma/client';
import {UserWithCategories} from "@/interfaces/user.interface";

const prisma = new PrismaClient();

export class UserRepository {
    /**
     * Find a user by email.
     * @param email - The user's email.
     * @returns The user object or null if not found.
     */
    async getUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({where: {email}});
    }

    /**
     * Create a new user.
     * @param data - Object containing user details (name, email, password).
     * @returns The newly created user.
     */
    async createUser(data: { name: string; email: string; password: string }): Promise<User> {
        return prisma.user.create({data});
    }

    /**
     * Find a user by ID.
     * @param id - The user's unique ID.
     * @returns The user object or null if not found.
     */
    async getUserById(id: string): Promise<User | null> {
        return prisma.user.findUnique({where: {id}});
    }

    /**
     * Find a user by ID with categories object.
     * @param id - The user's unique ID.
     * @returns The user object with categories or null if not found.
     */
    async getUserByIdWithCategories(id: string): Promise<UserWithCategories | null> {
        return prisma.user.findUnique({where: {id}, include: {categories: true}});
    }

    /**
     * Update user details.
     * @param id - The user's ID.
     * @param data - Fields to update.
     * @returns The updated user object.
     */
    async updateUser(id: string, data: Partial<User>): Promise<User | null> {
        return prisma.user.update({
            where: {id},
            data,
        });
    }

    /**
     * Delete a user by ID.
     * @param id - The user's ID.
     * @returns The deleted user object.
     */
    async deleteUser(id: string): Promise<User | null> {
        return prisma.user.delete({
            where: {id},
        });
    }

    /**
     * Check if the user is already subscribed to a category.
     * @param userId - The user's ID.
     * @param categoryId - The category ID.
     * @returns `true` if subscribed, `false` otherwise.
     */
    async isUserSubscribedToCategory(userId: string, categoryId: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: {id: userId},
            select: {categories: {where: {id: categoryId}}},
        });

        return !!user?.categories.length;
    }

    /**
     * Subscribe a user to a category.
     * @param userId - The user's ID.
     * @param categoryId - The category ID.
     */
    async subscribeUserToCategory(userId: string, categoryId: string): Promise<void> {
        // Check if the user is already subscribed
        const existingSubscription = await prisma.user.findUnique({
            where: {id: userId},
            select: {categories: {where: {id: categoryId}}}
        });

        if (existingSubscription?.categories.length) {
            throw new Error("User is already subscribed to this category.");
        }

        // Subscribe the user
        await prisma.user.update({
            where: {id: userId},
            data: {
                categories: {
                    connect: {id: categoryId} // Connect user to the category
                }
            }
        });
    }
}
