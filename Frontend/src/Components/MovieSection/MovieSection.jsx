import './MovieSection.css'
import { useGenre } from '../../hooks'
import { useEffect, useState } from 'react'
import { MovieGenre } from '../../gql/moviegenre/MovieGenre';
import MovieGenreSection from '../MovieGenreSection/MovieGenreSection';
function MovieSection() {
    const [genres, setGenre] = useState([]);
    const {data, error, loading} = useGenre();

    useEffect(() => {
        if (!error && !loading && data ){
            setGenre(data.genreQuery.body.genres)
        }
    },[data, loading, error])
    return (
        <>
            {genres.length > 1 &&
            genres.map((genre, idx) => (
                <MovieGenreSection genre={genre.title} key={idx}/>
            )) }
        </>
    )
}

export default MovieSection