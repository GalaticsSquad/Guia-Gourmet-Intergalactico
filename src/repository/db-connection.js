const pool = require("./db-pool");

TAG = "Connection: "

exports.executarQuerys = async (querys)=> {
    const client = await pool.connect(); 
    
    let results = [];
    try {
        await client.query("BEGIN");
        /* console.log(querys) */
        for (let i = 0; i < querys.length; i++) {
            try {
                const result = await client.query(querys[i].text, querys[i].params);
                results.push(result);
            } catch (err) {
                console.log(err);
                await client.query("ROLLBACK");
                client.release();
                throw err;
            }  
        }
    await client.query("COMMIT");
    return results;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
    client.release();
    }
}