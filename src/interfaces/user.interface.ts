import { Prisma } from "@prisma/client";

// user type with categories
export type UserWithCategories = Prisma.UserGetPayload<{ include: { categories: true } }>;
