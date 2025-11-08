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
  const insertMovieResult = await BulkInsertMovie(movies);
  console.log(insertMovieResult)
  
}

async function fetchByLink(link, options){
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
      if (await genreExists(genre.id)){
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

async function BulkInsertMovie(movies){
  let res = [];
  try {
    for (const movie of movies.results){
      const newMovie = createMovieObject(movie);
      const movieGenreIds = movie.genre_ids;
      if (await movieExists(newMovie.title)){
        console.log("Movie \"" + newMovie.title + "\" Exists")
        continue;
      }
        const movieInsertResult = await insertMovie(newMovie);
        for (const genreId of movieGenreIds){
          const movieGenreInsertResult = await insertMovieGenre(genreId, movieInsertResult.id)
        }
        res.push(movieInsertResult);
    }
    return res;
  } catch (err) {
    console.error("BulkInsertMovie... ", err)
  }
}

async function fetchMovieByName(movieName){
  try {
    const res = await query(`
      SELECT 
        "title"
      FROM "Movie" m 
      WHERE m."title" =  $1
    `, [movieName]);
    return res;
  } catch (err) {
    console.error("fetchMovieByName... ", err)
  }
}

async function movieExists(movieName){
  try {
    const res = await fetchMovieByName(movieName);
    if (res && res.rowCount >= 1){
      return true;
    }
    return false;
  } catch (err) {
    console.error("movieExists... ", err)
  }
}

async function insertMovie(movie){
  try{
      const result = await query(`
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
          $4,
          $5,
          $6,
          $7,
          $8
        )
          RETURNING *
        `, Object.values(movie));
        return result.rows[0];
  }catch (err){
    console.error("insertMovie... ", err)
  }
}

const createMovieObject = (movie) => ({
        "title": movie.title,
        "originalTitle": movie.original_title,
        "overview": movie.overview,
        "releaseDate": movie.release_date,
        "poster": movie.poster_path,
        "votingAverage": movie.vote_average,
        "adult": movie.adult,
        "language": movie.original_language
      });

async function insertMovieGenre(genreId, movieId){
  try{
    const res = await query(`
      INSERT INTO  "MovieGenre" (
        "GenreId",
        "movieId"
      ) VALUES (
        $1,
        $2
      ) 
      RETURNING *
    `, [genreId, movieId]);
    return res;
  } catch (err){
    console.error("insertMovieGenre... ", err);
  }
}

const ApiLink = {
  GenreList: 'https://api.themoviedb.org/3/genre/movie/list?language=en',
  MovieList: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=4'
}

restoreDump();
