import Banner from "../Components/Banner/Banner";
import TopMainBar from "../Components/TopMainBar/TopMainBar";
import MovieGenreSection from "../Components/MovieGenreSection/MovieGenreSection";
import MovieSection from "../Components/MovieSection/MovieSection";

export default function Home() {

    return (
        <header>
            <TopMainBar/>
            <Banner/>
            <MovieSection/>
        </header>
    )
}

