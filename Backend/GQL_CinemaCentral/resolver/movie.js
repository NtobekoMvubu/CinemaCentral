import query from "../../Common/db/db.js"
export default {
    Query: {
        movieQuery: async () => {
            const res = await query(`
                SELECT * FROM "Movie"
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