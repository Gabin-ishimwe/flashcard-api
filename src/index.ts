import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  AuthenticationError,
} from "apollo-server-core";
import express from "express";
import http from "http";
import typeDefs from "./schema/schema";
import Query from "./resolvers/Query";
import { DocumentNode } from "graphql";
import { PrismaClient } from "@prisma/client";
import Mutation from "./resolvers/Mutation";
import { Context, context } from "./context";
import dateScalar from "./resolvers/Date";
import SubCategory from "./resolvers/SubCategory";
import FlashCard from "./resolvers/FlashCard";
import Category from "./resolvers/Category";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const resolvers = {
  Query,
  Mutation,
  Date: dateScalar,
  Category,
  SubCategory,
  FlashCard,
};

// const context = {
//   generalCategory,
//   generalSubCategory,
// };
const prisma = new PrismaClient();
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 4000;
async function startApolloServer(
  typeDefs: DocumentNode,
  resolvers: { Query: any }
): Promise<void> {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    context: ({ req }): Object => {
      const token = req.headers.authorization || "";
      const user = jwt.decode(token);
      // if (!user) throw new AuthenticationError("User not logged in");
      return {
        user,
        prisma,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  const corsOptions = {
    origin: "*",
    credentials: true,
  };

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,
    cors: corsOptions,
  });

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);
