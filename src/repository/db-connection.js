const pool = require("./db-pool");

TAG = "Connection: "

exports.connection = async (query, params) => {
    const client = await pool.connect(); 
    try {
        await client.query("BEGIN");
        const response = await pool.query(query, params);
        await client.query("COMMIT");
        client.release()
        /* await client.end() */
        return response.rows
        
    } catch (error) {
        console.log(TAG, 'error caught');
        await client.query("ROLLBACK");
        client.release()
        throw error;
    }
};