import { gql } from "@apollo/client";
export const MovieGenre = gql`
    query MovieGenreQuery($params: MovieGenreQueryParams) {
        movieGenreQuery(params: $params) {
            ok
            body {
                statusCode
                movieGenre {
                    id
                    GenreId
                    movieId
                    createdTimestamp
                    modifiedTimestamp
                    active
                    movie {
                        title
                        overview
                        poster
                        votingAverage
                        releaseDate
                        backDrop
                    }
                    genre {
                        id
                        title
                    }
                }
            }
        }
    }
`;