import SvgIcon from '@mui/icons-material/TheatersOutlined';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import SearchIcon from '@mui/icons-material/Search';
import './TopMainBar.css'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
function TopMainBar(){

    console.log("TopMainBar component rendered");
    return(
        <nav className='top-main-bar'>
            <section className='main-title-section'>
            <SvgIcon component={TheatersOutlinedIcon} fontSize='large' color='error'/>
            <h2>CineCentral</h2>
            </section>

            <section className='genre-section'>
            <ul className='genre-list'>
                <li>Action</li>
                <li>Comedy</li>
                <li>Drama</li>
                <li>Sci-Fi</li>
                <li>Romance</li>
            </ul>
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