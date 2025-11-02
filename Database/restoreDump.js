import dotenv from "dotenv";
import query from "./db/db.js";
dotenv.config();
export async function restoreDump() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${process.env.API_KEY}`,
    },
  };

  const movies = await fetchByLink(ApiLink.MovieList, options)
  const genres = await fetchByLink(ApiLink.GenreList, options)

  const insertGenreResult = await insertGenre(genres.genres)
  const insertMovieResult = await insertMovie(movies.movies);
  
}

async function fetchByLink(link ,options){
  try {
    const response = await fetch(link, options)
    const data = await response.json();
    return data;
  }
  catch (err){
    console.error("FectchByLink... ", err)
  }
}

async function insertGenre(genres){
  try {
    let res = [];
    for (const genre of genres){
      if (genreExists(genre.id)){
        console.log("Genre " + genre.name + " Exists")
        continue;
      }
      const result = await query(`
        INSERT INTO "Genre" (
          "id",
          "title"
        )VALUES 
        (
          $1,
          $2
        )
          RETURNING *
      `, Object.values(genre))
      res.push(result)
    }
    return res;
  } catch (err)
  { 
    console.error("insertGenre... ", err)
  }
}

async function genreExists(id){
  try {
    const res = await fetchGenreById(id);
    if (res.rowCount >= 1){
      return true;
    }
    return false;
  } catch (error) {
    console.error("genreExists...", err)
  }
}

async function fetchGenreById(id){
  try {
    const res = await query(`
        SELECT 
          "id"
        FROM "Genre" g
        WHERE g."id" = $1
      `, [id]);
      return res
  } catch (error) {
    console.error("FetchGenre...  ", err)
  }
}

async function insertMovie(){
  try {
    const res = await query(`
      INSERT INTO "Movie" (
        "title",
        "originalTitle",
        "overview",
        "releaseDate",
        "poster",
        "votingAverage",
        "adult",
        "language"
      ) VALUES (
        $1,
        $2,
        $3,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8
      )
      `)
  } catch (error) {
    
  }
}

async function movieExists(movieName){
  try {
    const res = await query(`
      SELECT 
        m."title"
      FROM "Movie" m 
      WHERE m.title =  $1
    `[movieName]);
    return res;
  } catch (error) {
    
  }
}

const ApiLink = {
  GenreList: 'https://api.themoviedb.org/3/genre/movie/list?language=en',
  MovieList: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
}

restoreDump();
