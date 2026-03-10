import {useQuery} from "@apollo/client/react";
import { uselatestMovies } from "../gql/movie/uselatestMovies";
export const useLatestMovies = () =>{
    const {data, loading, error} = useQuery(uselatestMovies);
    return {
        loading,
        data,
        error
    }
}