import { MovieGenre } from "../gql/moviegenre/MovieGenre";
import { useQuery } from "@apollo/client/react";
export const useMovieGenre = (params) => {
    const {data, loading, error} = useQuery(MovieGenre, {variables: params});
    return {
        data,
        loading,
        error
    }

}