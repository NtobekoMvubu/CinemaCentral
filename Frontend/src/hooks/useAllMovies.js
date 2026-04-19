import { allMovies } from "../gql/movie/uselatestMovies";
import { useQuery } from "@apollo/client/react";

export const useAllMovies = () => {
    const {data, error, loading} = useQuery(allMovies);

    return {
        data,
        error,
        loading
    };
};