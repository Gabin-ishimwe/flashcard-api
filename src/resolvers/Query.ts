import {
  AuthenticationError,
  UserInputError,
  ValidationError,
} from "apollo-server-core";
import { PrismaClient } from "@prisma/client";
const Query = {
  hello: () => {
    return "Hello graphql dev";
  },
  categories: async (
    parent: any,
    args: any,
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    return await prisma.category.findMany();
  },
  subCategories: async (
    parent: any,
    args: any,
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    return await prisma.subCategory.findMany();
  },
  flashCards: async (
    parent: any,
    args: any,
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { prisma, user } = context;
    const { input } = args;
    console.log(input);
    if (!user) throw new AuthenticationError("User not logged in");
    return await prisma.flashCard.findMany({
      orderBy: [
        {
          title: input.order,
        },
      ],
      where: {
        title: {
          contains: input.field,
          mode: "insensitive",
        },
      },
    });
  },
  readCategory: async (
    parent: any,
    args: { id: number },
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { id } = args;
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new ValidationError("Category id doesn't exist");
    }
    return category;
  },
  readSubCategory: async (
    parent: any,
    args: { id: number },
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { id } = args;
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    const subCategory = await prisma.subCategory.findUnique({
      where: {
        id,
      },
    });
    if (!subCategory) {
      throw new UserInputError("Sub category id doesn't exist");
    }
    return subCategory;
  },
  readFlashCard: async (
    parent: any,
    args: { id: number },
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { id } = args;
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    const flashCard = await prisma.flashCard.findUnique({
      where: {
        id,
      },
    });

    if (!flashCard) throw new UserInputError("Flash card id doesn't exist");
    return flashCard;
  },
};
export default Query;
