"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const typeDefs = (0, apollo_server_core_1.gql) `
  scalar Date
  type Query {
    hello: String
    categories: [Category!]
    subCategories: [SubCategory!]
    flashCards: [FlashCard!]
  }

  type Mutation {
    addCategory(input: category!): Category
    updateCategory(input: updateCategory): Category!
    deleteCategory(id: Int!): Category!
    readCategory(id: Int!): Category!
    addSubCategory(input: subCategory!): SubCategory
    updateSubCategory(input: updateSubCategory): SubCategory!
    deleteSubCategory(id: Int!): SubCategory!
    readSubCategory(id: Int!): SubCategory!
    addFlashCard(input: flashCard): FlashCard
    updateFlashCard(input: updateFlashCard): FlashCard
    deleteFlashCard(id: Int!): FlashCard
    readFlashCard(id: Int!): FlashCard!
    userRegister(input: userRegister!): User!
    userLogin(input: userLogin): User!
  }

  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    token: String
  }

  type Category {
    id: Int!
    name: String!
    createdAt: Date
    updatedAt: Date
    subCategory: [SubCategory]
    userId: Int!
  }

  type SubCategory {
    id: Int!
    name: String!
    createdAt: Date!
    updatedAt: Date!
    category: Category!
    flashCards: [FlashCard]
    userId: Int!
  }

  type FlashCard {
    id: Int!
    title: String!
    question: String!
    answer: String!
    createdAt: Date
    updatedAt: Date
    subCategory: SubCategory!
    userId: Int!
  }

  input userRegister {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input userLogin {
    email: String!
    password: String!
  }

  input category {
    name: String!
  }

  input subCategory {
    name: String!
    categoryId: Int!
  }

  input flashCard {
    title: String!
    question: String!
    answer: String!
    subCategoryId: Int!
  }

  input updateCategory {
    id: Int!
    name: String!
  }

  input updateSubCategory {
    id: Int!
    name: String!
  }

  input updateFlashCard {
    id: Int!
    title: String!
    question: String!
    answer: String!
  }
`;
exports.default = typeDefs;
