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

   const res = await query(`
      SELECT * FROM "flyway_schema_history"
    `);
    console.log(res);

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

const ApiLink = {
  GenreList: 'https://api.themoviedb.org/3/genre/movie/list?language=en',
  MovieList: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
}

restoreDump();
