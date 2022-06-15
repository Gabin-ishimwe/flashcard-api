import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

export default typeDefs;
