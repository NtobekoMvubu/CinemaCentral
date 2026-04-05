import { GenreQuery } from "../gql/Genre/Genre";
import { useQuery } from "@apollo/client/react";

export const useGenre = () => {
    const {data, error, loading} = useQuery(GenreQuery);
    
    return {
        data, 
        error,
        loading
    }
}