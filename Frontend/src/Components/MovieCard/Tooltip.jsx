import { useEffect, useState } from "react";
import './Tooltip.css'
import Button from '@mui/material/Button';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import InfoIcon from '@mui/icons-material/Info';

function Tooltip({modal, movie}){
    const tmdbLink = "https://image.tmdb.org/t/p/original";
 
    return(
        <section className={`tooltip-container ${modal.show ? "show": ""}`} style={{top: modal. y, left: modal.x}}>
            <img className="movie-backDrop" src={`${tmdbLink}${movie?.backDrop}`} alt={movie?.title}/>
            <h1 className="tooltip-header">{movie?.title}</h1>
            <div className="tooltip-button-container">
                <Button className='watch-trailer-button' startIcon={<PlayArrowOutlinedIcon/>} variant='contained' color='error' size='large' sx={{fontSize:"1.5rem", borderRadius:"0.8rem", "& .MuiSvgIcon-root": {fontSize: "32px",}}}  >Play Trailer</Button>
                <IconButton sx={{backgroundColor: "darkgrey", color: "white", width: "60px", size: "32px"}}>
                    <ThumbUpIcon/>
                </IconButton>
                <IconButton sx={{backgroundColor: "darkgray", color: "white", width: "60px"}}>
                    <InfoIcon/>
                </IconButton>
            </div>
            <p className="tooltip-movie-description">{movie?.overview}</p>


        </section>
    )
}

export default Tooltip