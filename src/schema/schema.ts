import { gql } from "apollo-server-core";

const typeDefs = gql`
  scalar Date
  type Query {
    hello: String
    categories: [Category!]
    subCategories: [SubCategory!]
    flashCards(input: sortBy): [FlashCard!]
    readCategory(id: Int!): Category!
    readSubCategory(id: Int!): SubCategory!
    readFlashCard(id: Int!): FlashCard!
  }

  type Mutation {
    addCategory(input: category!): Category
    updateCategory(input: updateCategory): Category!
    deleteCategory(id: Int!): Category!
    addSubCategory(input: subCategory!): SubCategory
    updateSubCategory(input: updateSubCategory): SubCategory!
    deleteSubCategory(id: Int!): SubCategory!
    addFlashCard(input: flashCard): FlashCard
    updateFlashCard(input: updateFlashCard): FlashCard
    deleteFlashCard(id: Int!): FlashCard
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
  enum order {
    asc
    desc
  }
  input sortBy {
    order: order!
    field: String
  }
`;

export default typeDefs;
