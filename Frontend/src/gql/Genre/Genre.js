import { gql } from "@apollo/client";
export const GenreQuery = gql`
    query GenreQuery {
        genreQuery {
            ok
            body {
                statusCode
                genres {
                    title
                }
            }
        }
    }
`;