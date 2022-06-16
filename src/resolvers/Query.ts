import { Context } from "../context";
import { AuthenticationError } from "apollo-server-core";
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
    if (!user) throw new AuthenticationError("User not logged in");
    return await prisma.flashCard.findMany();
  },
};
export default Query;
