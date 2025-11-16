import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./GQL_CinemaCentral/schema/index.js";
import resolvers from "./GQL_CinemaCentral/resolver/index.js";

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
});

console.log("Port running at: " + url);