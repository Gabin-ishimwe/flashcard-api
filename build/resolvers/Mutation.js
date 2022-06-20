"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Mutation = {
    addCategory: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("-------running mutation-----");
        const { input } = args;
        const { prisma, user } = context;
        if (!user)
            throw new apollo_server_core_1.AuthenticationError("User not logged in");
        const findUser = yield prisma.user.findUnique({
            where: {
                id: user.id,
            },
        });
        if (!findUser)
            throw new apollo_server_core_1.UserInputError("User id doesn't exist");
        const category = yield prisma.category.create({
            data: {
                name: input.name,
                userId: user === null || user === void 0 ? void 0 : user.id,
            },
        });
        console.log(category);
        return category;
    }),
    updateCategory: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = args;
        const { prisma, user } = context;
        if (!user)
            throw new apollo_server_core_1.AuthenticationError("User not logged in");
        const category = yield prisma.category.findUnique({
            where: {
                id: input.id,
            },
        });
        if (!category) {
            throw new apollo_server_core_1.ValidationError("Category id doesn't exist");
        }
        const updateCategory = yield prisma.category.update({
            where: {
                id: input.id,
            },
            data: {
                name: input.name,
            },
        });
        return updateCategory;
    }),
    deleteCategory: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        const { prisma, user } = context;
        if (!user)
            throw new apollo_server_core_1.AuthenticationError("User not logged in");
        const category = yield prisma.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            throw new apollo_server_core_1.ValidationError("Category id doesn't exist");
        }
        const deleteSubCategories = prisma.subCategory.deleteMany({
            where: {
                categoryId: id,
            },
        });
        const deleteCategory = prisma.category.delete({
            where: {
                id,
            },
        });
        const [deletedSubCategories, deletedCategories] = yield prisma.$transaction([deleteSubCategories, deleteCategory]);
        return Object.assign(Object.assign({ message: "category deleted" }, deletedSubCategories), deletedCategories);
    }),
    readCategory: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        const { prisma, user } = context;
        if (!user)
            throw new apollo_server_core_1.AuthenticationError("User not logged in");
        const category = yield prisma.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            throw new apollo_server_core_1.ValidationError("Category id doesn't exist");
        }
        return category;
    }),
    addSubCategory: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = args;
        const { prisma, user } = context;
        if (!user)
            throw new apollo_server_core_1.AuthenticationError("User not logged in");
        const category = yield prisma.category.findUnique({
            where: {
                id: input.categoryId,
            },
        });
        if (!category) {
            throw new apollo_server_core_1.ValidationError("Category id doesn't exist");
        }
        const subCategory = yield prisma.subCategory.create({
            data: {
                name: input.name,
                categoryId: input.categoryId,
                userId: user.id,
            },
        });
        console.log(subCategory);
        return subCategory;
    }),
    updateSubCategory: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = args;
        const { prisma, user } = context;
        if (!user)
            throw new apollo_server_core_1.AuthenticationError("User not logged in");
        const subCategory = yield prisma.subCategory.findUnique({
            where: {
                id: input.id,
            },
        });
        if (!subCategory) {
            throw new apollo_server_core_1.UserInputError("Sub category id doesn't exist");
        }
        return yield prisma.subCategory.update({
            where: {
                id: input.id,
            },
            data: {
                name: input.name,
            },
        });
    }),
    deleteSubCategory: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        const { prisma, user } = context;
        if (!user)
            throw new apollo_server_core_1.AuthenticationError("User not logged in");
        const subCategory = yield prisma.subCategory.findUnique({
            where: {
                id,
            },
        });
        if (!subCategory) {
            throw new apollo_server_core_1.UserInputError("Sub category id doesn't exist");
        }
        return yield prisma.subCategory.delete({
            where: {
                id,
            },
        });
    }),
    readSubCategory: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        const { prisma, user } = context;
        if (!user)
            throw new apollo_server_core_1.AuthenticationError("User not logged in");
        const subCategory = yield prisma.subCategory.findUnique({
            where: {
                id,
            },
        });
        if (!subCategory) {
            throw new apollo_server_core_1.UserInputError("Sub category id doesn't exist");
        }
        return subCategory;
    }),
    addFlashCard: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = args;
        const { prisma, user } = context;
        if (!user)
            throw new apollo_server_core_1.AuthenticationError("User not logged in");
        const subCategory = yield prisma.subCategory.findUnique({
            where: {
                id: input.subCategoryId,
            },
        });
        if (!subCategory) {
            throw new apollo_server_core_1.ValidationError("Sub Category id doesn't exist");
        }
        const flashCard = yield prisma.flashCard.create({
            data: {
                title: input.title,
                question: input.question,
                answer: input.answer,
                subCategoryId: input.subCategoryId,
                userId: user.id,
            },
        });
        return flashCard;
    }),
    updateFlashCard: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = args;
        const { prisma, user } = context;
        if (!user)
            throw new apollo_server_core_1.AuthenticationError("User not logged in");
        const flashCard = yield prisma.flashCard.findUnique({
            where: {
                id: input.id,
            },
        });
        if (!flashCard)
            throw new apollo_server_core_1.UserInputError("Flash card id doesn't exist");
        return yield prisma.flashCard.update({
            where: {
                id: input.id,
            },
            data: {
                question: input.question,
                answer: input.answer,
            },
        });
    }),
    deleteFlashCard: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        const { prisma, user } = context;
        if (!user)
            throw new apollo_server_core_1.AuthenticationError("User not logged in");
        const flashCard = yield prisma.flashCard.findUnique({
            where: {
                id,
            },
        });
        if (!flashCard)
            throw new apollo_server_core_1.UserInputError("Flash card id doesn't exist");
        return yield prisma.flashCard.delete({
            where: {
                id,
            },
        });
    }),
    readFlashCard: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        const { prisma, user } = context;
        if (!user)
            throw new apollo_server_core_1.AuthenticationError("User not logged in");
        const flashCard = yield prisma.flashCard.findUnique({
            where: {
                id,
            },
        });
        if (!flashCard)
            throw new apollo_server_core_1.UserInputError("Flash card id doesn't exist");
        return flashCard;
    }),
    userRegister: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = args;
        const { prisma } = context;
        const findUser = yield prisma.user.findUnique({
            where: {
                email: input.email,
            },
        });
        if (findUser)
            throw new apollo_server_core_1.ValidationError(`User with email ${findUser.email} arleady exists`);
        const salt = bcryptjs_1.default.genSaltSync(10);
        const password = bcryptjs_1.default.hashSync(input.password, salt);
        const user = yield prisma.user.create({
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                password,
                token: "",
            },
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email,
            }, "secretkey", {
                expiresIn: "1d",
            });
            return yield prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    token,
                },
            });
        }
        throw new apollo_server_core_1.ApolloError("Error occured while creating user");
    }),
    userLogin: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = args;
        const { prisma } = context;
        const user = yield prisma.user.findUnique({
            where: {
                email: input.email,
            },
        });
        if (!user)
            throw new apollo_server_core_1.ValidationError("user doesn't exist");
        const comparePassword = bcryptjs_1.default.compareSync(input.password, user.password);
        if (comparePassword) {
            const newToken = jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email,
            }, "secretkey", {
                expiresIn: "1d",
            });
            return yield prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    token: newToken,
                },
            });
        }
        throw new apollo_server_core_1.ApolloError("user password incorrect", "INCORRECT PASSWORD");
    }),
};
exports.default = Mutation;
