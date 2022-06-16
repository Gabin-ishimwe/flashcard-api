import { Context } from "../context";
import { AuthenticationError } from "apollo-server-core";
import { PrismaClient } from "@prisma/client";

const Category = {
  subCategory: async (
    parent: any,
    args: any,
    context: { prisma: PrismaClient; user: any }
  ) => {
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    return await prisma.subCategory.findMany({
      where: {
        categoryId: parent.id,
      },
    });
  },
};

export default Category;
