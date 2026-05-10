import { useEffect, useRef, useState } from 'react';
import './MovieCard.css'
import Tooltip from './Tooltip';
function MovieCard({selectedMovie}) {
    const tmdbLink = "https://image.tmdb.org/t/p/original";
    const [movie, setMovie] = useState([]);
    const [modal, setModal] = useState({show: false, x: 0, y:0});
    const [pos, setPos] = useState({x: 0, y: 0});
    const container = useRef();
    const timeoutRef = useRef(null);


    useEffect(() => {
        setMovie(selectedMovie);
    }, [selectedMovie]);

    const handleMouseEnter = ()=> {
        const rect = container.current.getBoundingClientRect();

        timeoutRef.current = setTimeout(() => {
            setModal({
                show: true,
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            });
        }, 1000);
    };

    const handleMouseLeave = ()=> {
        clearTimeout(timeoutRef.current)
        setModal((m)=> ({...m, show: false}))
        
    }

    return (
        <>
        <div ref={container} className="movieCard-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
            <Tooltip modal={modal} movie={selectedMovie} />
        </div>
        </>
    )
}

export default MovieCard