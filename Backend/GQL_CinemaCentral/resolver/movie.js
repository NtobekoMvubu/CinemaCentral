import query from "../../Common/db/db.js"
export default {
    Query: {
        movieQuery: async () => {
            const res = await query(`
                SELECT * 
                FROM "Movie" m
                ORDER BY m."releaseDate" DESC
                LIMIT 7
            `);
            return {
                ok: true,
                body: {
                    statusCode: 200, 
                    movies: res.rows
                }
            };
        }
    }
}