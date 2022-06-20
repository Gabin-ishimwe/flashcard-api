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
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const schema_1 = __importDefault(require("../src/schema/schema"));
const Query_1 = __importDefault(require("../src/resolvers/Query"));
const client_1 = require("@prisma/client");
const Mutation_1 = __importDefault(require("./resolvers/Mutation"));
const Date_1 = __importDefault(require("./resolvers/Date"));
const SubCategory_1 = __importDefault(require("./resolvers/SubCategory"));
const FlashCard_1 = __importDefault(require("./resolvers/FlashCard"));
const Category_1 = __importDefault(require("./resolvers/Category"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const resolvers = {
    Query: Query_1.default,
    Mutation: Mutation_1.default,
    Date: Date_1.default,
    Category: Category_1.default,
    SubCategory: SubCategory_1.default,
    FlashCard: FlashCard_1.default,
};
// const context = {
//   generalCategory,
//   generalSubCategory,
// };
const prisma = new client_1.PrismaClient();
function startApolloServer(typeDefs, resolvers) {
    return __awaiter(this, void 0, void 0, function* () {
        // Required logic for integrating with Express
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        // Same ApolloServer initialization as before, plus the drain plugin.
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs,
            resolvers,
            csrfPrevention: true,
            context: ({ req }) => {
                const token = req.headers.authorization || "";
                const user = jsonwebtoken_1.default.decode(token);
                // if (!user) throw new AuthenticationError("User not logged in");
                return {
                    user,
                    prisma,
                };
            },
            plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        });
        // More required logic for integrating with Express
        yield server.start();
        server.applyMiddleware({
            app,
        });
        // Modified server startup
        yield new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}
startApolloServer(schema_1.default, resolvers);
