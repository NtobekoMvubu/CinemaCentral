import { useEffect, useState } from "react";
import './Tooltip.css'
import Button from '@mui/material/Button';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import IconButton from "@mui/material/IconButton";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

function Tooltip({modal, movie}){
    const tmdbLink = "https://image.tmdb.org/t/p/original";
 
    return(
        <section className={`tooltip-container ${modal.show ? "show": ""}`} style={{top: modal. y, left: modal.x}}>
            <img className="movie-backDrop" src={`${tmdbLink}${movie?.backDrop}`} alt={movie?.title}/>
            <div className="movie-title-actions">
                <h1 className="tooltip-header">{movie?.title}</h1>
                <div className="tooltip-button-container">
                    <IconButton sx={{backgroundColor: "white"}}>
                        <PlayArrowOutlinedIcon/>
                    </IconButton>
                    <IconButton sx={{ border: "3px solid grey", color: "white"}}>
                        <ThumbUpOutlinedIcon/>
                    </IconButton>
                    <IconButton sx={{border: "3px solid grey",  color: "white"}}>
                        <AddOutlinedIcon/>
                    </IconButton>
                </div>
            </div>
            <p className="tooltip-movie-description">{movie?.overview}</p>


        </section>
    )
}

export default Tooltip