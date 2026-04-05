import query from "../../Common/db/db.js";
export default {
    Query: {
        genreQuery: async () => {
            const res = await query(`
                select g."title" from "Genre" g
            `);
            return {
                ok: true,
                body: {
                    statusCode: 200,
                    genres: res.rows
                }
            }
        },
        genreFilterId: async (_, event) => {
            const id = event.params.id;

            const res = await query(`
                SELECT * FROM "Genre" g 
                    where g."id" = $1
            `, [id]);
            return {
                ok: true,
                body: {
                    statusCode: 200,
                    genres: res.rows
                }
            }

        }
    }
}