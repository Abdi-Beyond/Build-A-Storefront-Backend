import dotenv from 'dotenv'
import { Pool } from 'pg'
dotenv.config()

const  {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_USER_TEST,
    POSTGRES_PASSWORD,
    POSTGES_PORT,
    ENV,

} = process.env
let client: Pool;
if (ENV === 'test') {
client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER_TEST,
        password: POSTGRES_PASSWORD,
        port: Number(POSTGES_PORT),
    });
   

}
else {
client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: Number(POSTGES_PORT),
});
}

export default client


