import { Context } from "../context";
import { PrismaClient } from "@prisma/client";
import { AuthenticationError } from "apollo-server-core";

const SubCategory = {
  category: async (
    parent: any,
    args: any,
    context: { prisma: PrismaClient; user: any }
  ) => {
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    return prisma.category.findUnique({
      where: {
        id: parent.categoryId,
      },
    });
  },
  flashCards: async (
    parent: any,
    args: any,
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    return prisma.flashCard.findMany({
      where: {
        subCategoryId: parent.id,
      },
    });
  },
};

export default SubCategory;
