import { useEffect, useState } from 'react';
import { useLatestMovies } from '../../hooks';
import './Banner.css';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import Button from '@mui/material/Button';
function Banner (){
    const [currentMovie, setCurrentMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const tmdbLink = "https://image.tmdb.org/t/p/original";
    let {data, loading, error} = useLatestMovies();
    let currentMovieIndex = 0;
    
    useEffect(() => {
        if (!loading && !error && data){
            setMovies(data.movieQuery.body.movies);
        }
    }, [loading, error, data])

    useEffect (() => {
        setInterval(() => {
            if (movies.length === 0){
                return
            }
            if (currentMovieIndex > movies.length -1) {
                currentMovieIndex = 0;
            }
            setCurrentMovie(movies[currentMovieIndex])
            currentMovieIndex++
        }, 15000);
    }, [movies])

    function handleMoviePrev() {
        currentMovieIndex --;
    }

    function handleMovieNext() {
        currentMovieIndex--;
    }

    return (
        <>
            <div className="carousel-wrapper">
                {loading && 
                    <p>Loading...</p>}
                {error && 
                    <p>Error: {error.message}</p>}
                {data && 
                <div>
                    <img className='carousel-poster' src={`${tmdbLink}${currentMovie?.backDrop}`}  alt={currentMovie?.title}/>
                    <div className='overlay'>
                        <div className="carousel-movie-row">                        
                            <div className='carousel-movie-prev'>
                                <span className='movie-action-prev' onClick={handleMoviePrev}>&lt;</span>
                            </div>
                            <div className='carousel-movie-details'>
                                <h1  className='carousel-movie-title'>{currentMovie?.title} </h1>
                                <h3 className='carousel-movie-stats'>{`${new Date(currentMovie?.releaseDate).getFullYear()} • ${currentMovie?.language} • ${currentMovie?.votingAverage || 'Coming soon...'}`}</h3>
                                <p className='carousel-movie-overview'>{currentMovie?.overview}</p>
                                <div className='carousel-movie-buttons'>
                                    <Button className='watch-trailer-button' startIcon={<PlayArrowOutlinedIcon/>} variant='contained' color='error' size='large' sx={{fontSize:"1.5rem", borderRadius:"0.8rem", "& .MuiSvgIcon-root": {fontSize: "32px",}}}  >Play Trailer</Button>
                                    <Button className='movie-info-button' startIcon={<InfoOutlineIcon/>} variant='contained' color='secondary' size='large'   sx={{backgroundColor: "grey.500", color: "white",    "&:hover": { backgroundColor: "grey.700",  }, fontSize:"1.5rem", borderRadius: "0.8rem", "& .MuiSvgIcon-root": {fontSize: "32px",},  }} >More Info</Button>
                                </div>
                            </div>
                            <div className='carousel-movie-next'>
                                <span className='movie-action-next' onClick={handleMovieNext}>&gt;</span>
                            </div>
                        </div>

                        <div className='carousel-animated-movie-indicator'>
                            {movies.map((movie, idx) => (
                                //need to use RecoilState so i can update the whole section 
                                <div key={idx} className={`dot${3 === idx ? '-active': ''}`}></div>
                            ))}
                        </div>
                    </div>
                </div>
                }
            </div>
        </>
    )
}
export default Banner;