import { useEffect, useState } from 'react';
import './MovieCard.css'
function MovieCard({selectedMovie}) {
    const tmdbLink = "https://image.tmdb.org/t/p/original";
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        setMovie(selectedMovie);
    }, [selectedMovie]);

    return (
        <div className="movieCard-container">
            <img className='movie-poster' src={`${tmdbLink}${movie?.poster}`} alt={movie?.title}/>
            <div className='overlay'>
                <div className='movie-details'>
                    <div>
                        <h1>{movie?.title}</h1>
                    </div>
                    <div>
                        <p> ⭐ {movie?.votingAverage} • {new Date(movie?.releaseDate).getFullYear()} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard