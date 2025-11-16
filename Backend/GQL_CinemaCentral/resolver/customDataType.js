import { GraphQLScalarType, Kind } from "graphql";


const DateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Custom Date scalar type",
    parseValue(value){
        return new Date(value); 
    },
    serialize(value){
        return value.toISOString().split("T")[0];
    },
    parseLiteral(ast){
        if (ast.kind === Kind.STRING){
            return  new Date(ast.value);
        }
        return null;
    }
});

const TimeStampScalar = new GraphQLScalarType({
    name: "Timestamp",
    description: "Custom TimeStamp scalar type",
    parseValue(value){
        return new Date(value);
    },
    serialize(value){
        return value.toISOString();
    },
    parseLiteral(ast){
        if (ast.kind === Kind.STRING){
            return new Date(ast.value);
        }
        return null;
    },
});

export const resolvers = {
    Date: DateScalar,
    Timestamp: TimeStampScalar,
};