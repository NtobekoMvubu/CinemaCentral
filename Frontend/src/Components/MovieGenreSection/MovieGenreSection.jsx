import { useMovieGenre } from '../../hooks';
import MovieCard from '../MovieCard/MovieCard.jsx'
import './MovieGenreSection.css'

import { useEffect, useState } from "react";

function MovieGenreSection({genre}) {
    const [movieGenres, setMovieGenres] = useState([])

    const queryParams = {
        params: {
            title: genre
        }
    };
    let {data, loading, error} = useMovieGenre(queryParams); 
    useEffect(() => {
        console.log(data?.movieGenreQuery.body.movieGenre);
        setMovieGenres(data?.movieGenreQuery.body.movieGenre)
    }, [data, loading, error]);
    return (
        <div className='container'>
            <h2 className='container-title'>{genre}</h2>
            <div className='movie-section'>
                {
                    movieGenres?.map((movieGenre, idx) => {
                        if (idx > 9){
                            return
                        }
                        return <MovieCard key={idx} selectedMovie={movieGenre.movie}/>
                    })
                }
            </div>
        </div>
    )
}

export default MovieGenreSection