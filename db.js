const pg=require('pg');
const pool=new pg.Pool({
    user:"postgres",
    host:"localhost",
    database:"api",
    password:'123',
    port:5432
});
module.exports=pool;