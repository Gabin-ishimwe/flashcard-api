import { Context } from "../context";
import { PrismaClient } from "@prisma/client";
import { AuthenticationError } from "apollo-server-core";

const FlashCard = {
  subCategory: async (
    parent: any,
    args: any,
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object | null> => {
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    return await prisma.subCategory.findUnique({
      where: {
        id: parent.subCategoryId,
      },
    });
  },
};

export default FlashCard;
