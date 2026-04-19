import { gql } from "@apollo/client";
export const uselatestMovies = gql`
    query MovieQuery {
        movieQuery {
            body {
                movies {
                    title
                    releaseDate
                    overview
                    poster
                    backDrop
                    language
                    adult
                    votingAverage
                }
            }
        }
    }
`;

export const allMovies = gql`
    query AllMoviesQuery {
        allMoviesQuery {
            body {
                movies {
                    title
                    releaseDate
                    poster
                }
            }
        }
    }
`;