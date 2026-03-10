import Banner from "../Components/Banner/Banner";
import TopMainBar from "../Components/TopMainBar/TopMainBar";
import { useLatestMovies } from "../hooks";

export default function Home() {

    return (
        <header>
            <TopMainBar/>
            <Banner/>
        </header>
    )
}

