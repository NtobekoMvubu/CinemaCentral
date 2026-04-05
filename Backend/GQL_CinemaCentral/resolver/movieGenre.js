import query from "../../Common/db/db.js";
export default {
    Query: {
        movieGenreQuery: async (_, event) => {
            const genreTitle = event.params.title
            const res = await query(`
                SELECT mg.*,
                row_to_json(g.*) AS "genre",
                row_to_json(m.*) AS "movie"
                FROM "MovieGenre" mg 
                LEFT JOIN "Genre" g ON g."id" = mg."GenreId"
                LEFT JOIN "Movie" m ON m."id" = mg."movieId"  
                WHERE g.title = $1
            `, [genreTitle]);

            return {
                ok: true,
                body: {
                    statusCode: 200,
                    movieGenre: res.rows
                }
            }

        }
    }
}