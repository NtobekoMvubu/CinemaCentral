import SvgIcon from '@mui/icons-material/TheatersOutlined';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import SearchIcon from '@mui/icons-material/Search';
import './TopMainBar.css'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useAllMovies } from '../../hooks/useAllMovies';
import { useEffect, useState } from 'react';
function TopMainBar(){
    const [movies, setMovies] = useState()
    const {data, error, loading} = useAllMovies();
    const tmdbLink = "https://image.tmdb.org/t/p/original";


    useEffect(() => {
        if (data && !error && !loading){
            console.log(data?.allMoviesQuery?.body.movies);
            setMovies(data?.allMoviesQuery?.body.movies);
        }
    }, [data, loading, error]);

    return(
        <nav className='top-main-bar'>
            <section className='title-genre-section'>
                <div className="main-title-section">
                    <SvgIcon component={TheatersOutlinedIcon} fontSize='large' color='error'/>
                    <h2>CineCentral</h2>  
                </div>
                <section className='genre-section'>
                    <ul className='genre-list'>
                        <li className='genre-list-item'>Action</li>
                        <li className='genre-list-item'>Comedy</li>
                        <li className='genre-list-item'>Drama</li>
                        <li className='genre-list-item'>Sci-Fi</li>
                        <li className='genre-list-item'>Romance</li>
                    </ul>
                </section>
            </section>
            <section className='search-section'>
                <Autocomplete 
                className='movie-search-input' 
                options={movies}
                getOptionLabel={(option)=> option.title}
                renderInput={(params)=> 
                <TextField {...params}
                    placeholder="Search movies..."  
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <SvgIcon component={SearchIcon}/>
                        )
                    }}
                    /> 
                }
                renderOption={(props, option)=> (
                    <li {...props}>
                        <section className='option-container'>
                            <img className='option-image'  src={`${tmdbLink}${option?.poster}`} alt={option?.title}/>
                            <div className='option-info'>
                                <h2 className='option-title'>{option?.title}</h2>
                                <h4 className='option-year'>{new Date(option?.releaseDate).getFullYear()}</h4>
                            </div>
                        </section>
                    </li>
                )}
                />
            </section>
        </nav>
    )
    
}

export default TopMainBar