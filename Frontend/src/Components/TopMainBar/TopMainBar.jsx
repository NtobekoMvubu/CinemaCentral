import SvgIcon from '@mui/icons-material/TheatersOutlined';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import SearchIcon from '@mui/icons-material/Search';
import './TopMainBar.css'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
function TopMainBar(){

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
                options={['The Chosen']}
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
                />
            </section>
        </nav>
    )
    
}

export default TopMainBar