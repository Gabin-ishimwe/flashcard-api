import { PrismaClient } from "@prisma/client";
import { Context } from "../context";
import {
  UserInputError,
  ValidationError,
  ApolloError,
  AuthenticationError,
} from "apollo-server-core";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const Mutation = {
  addCategory: async (
    parent: any,
    args: { input: CreateCategory },
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    console.log("-------running mutation-----");
    const { input } = args;
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    const findUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!findUser) throw new UserInputError("User id doesn't exist");
    const category = await prisma.category.create({
      data: {
        name: input.name,
        userId: user?.id,
      },
    });
    console.log(category);
    return category;
  },
  updateCategory: async (
    parent: any,
    args: { input: UpdateCategory },
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { input } = args;
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    const category = await prisma.category.findUnique({
      where: {
        id: input.id,
      },
    });
    if (!category) {
      throw new ValidationError("Category id doesn't exist");
    }
    const updateCategory = await prisma.category.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
      },
    });

    return updateCategory;
  },
  deleteCategory: async (
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

    const deleteSubCategories = prisma.subCategory.deleteMany({
      where: {
        categoryId: id,
      },
    });
    const deleteCategory: any = prisma.category.delete({
      where: {
        id,
      },
    });
    const [deletedSubCategories, deletedCategories] = await prisma.$transaction(
      [deleteSubCategories, deleteCategory]
    );
    return {
      message: "category deleted",
      ...deletedSubCategories,
      ...deletedCategories,
    };
  },

  addSubCategory: async (
    parent: any,
    args: { input: CreateSubCategory },
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { input } = args;
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    const category = await prisma.category.findUnique({
      where: {
        id: input.categoryId,
      },
    });

    if (!category) {
      throw new ValidationError("Category id doesn't exist");
    }

    const subCategory = await prisma.subCategory.create({
      data: {
        name: input.name,
        categoryId: input.categoryId,
        userId: user.id,
      },
    });
    console.log(subCategory);
    return subCategory;
  },
  updateSubCategory: async (
    parent: any,
    args: { input: UpdateSubCategory },
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { input } = args;
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    const subCategory = await prisma.subCategory.findUnique({
      where: {
        id: input.id,
      },
    });
    if (!subCategory) {
      throw new UserInputError("Sub category id doesn't exist");
    }
    return await prisma.subCategory.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
      },
    });
  },
  deleteSubCategory: async (
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
    return await prisma.subCategory.delete({
      where: {
        id,
      },
    });
  },

  addFlashCard: async (
    parent: any,
    args: { input: AddFlashCard },
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { input } = args;
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    const subCategory = await prisma.subCategory.findUnique({
      where: {
        id: input.subCategoryId,
      },
    });
    if (!subCategory) {
      throw new ValidationError("Sub Category id doesn't exist");
    }
    const flashCard = await prisma.flashCard.create({
      data: {
        title: input.title,
        question: input.question,
        answer: input.answer,
        subCategoryId: input.subCategoryId,
        userId: user.id,
      },
    });

    return flashCard;
  },
  updateFlashCard: async (
    parent: any,
    args: { input: UpdateFlashCard },
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { input } = args;
    const { prisma, user } = context;
    if (!user) throw new AuthenticationError("User not logged in");
    const flashCard = await prisma.flashCard.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!flashCard) throw new UserInputError("Flash card id doesn't exist");

    return await prisma.flashCard.update({
      where: {
        id: input.id,
      },
      data: {
        title: input.title,
        question: input.question,
        answer: input.answer,
      },
    });
  },
  deleteFlashCard: async (
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

    return await prisma.flashCard.delete({
      where: {
        id,
      },
    });
  },

  userRegister: async (
    parent: any,
    args: { input: UserRegister },
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { input } = args;
    const { prisma } = context;
    const findUser = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (findUser)
      throw new ValidationError(
        `User with email ${findUser.email} arleady exists`
      );
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(input.password, salt);

    const user = await prisma.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password,
        token: "",
      },
    });

    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        "secretkey",
        {
          expiresIn: "1d",
        }
      );
      return await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          token,
        },
      });
    }
    throw new ApolloError("Error occured while creating user");
  },
  userLogin: async (
    parent: any,
    args: { input: UserLogin },
    context: { prisma: PrismaClient; user: any }
  ): Promise<Object> => {
    const { input } = args;
    const { prisma } = context;
    const user = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (!user) throw new ValidationError("user doesn't exist");
    const comparePassword = bcrypt.compareSync(input.password, user.password);
    if (comparePassword) {
      const newToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        "secretkey",
        {
          expiresIn: "1d",
        }
      );
      return await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          token: newToken,
        },
      });
    }
    throw new ApolloError("user password incorrect", "INCORRECT PASSWORD");
  },
};

type CreateCategory = {
  name: string;
};

type CreateSubCategory = {
  name: string;
  categoryId: number;
};

type AddFlashCard = {
  title: string;
  question: string;
  answer: string;
  subCategoryId: number;
};

type UpdateCategory = {
  id: number;
  name: string;
};

type UpdateSubCategory = {
  id: number;
  name: string;
};

type UpdateFlashCard = {
  id: number;
  title: string;
  question: string;
  answer: string;
};

type UserRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type UserLogin = {
  email: string;
  password: string;
};

export default Mutation;
