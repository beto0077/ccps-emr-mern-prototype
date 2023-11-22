import {createPool} from 'mysql2/promise'
import * as dotenv from "dotenv"

dotenv.config();

/*export const pool = createPool({
    host: process.env.GOOGLE_CLOUD_HOST,
    port: 3306,
    user: 'root',
    password: process.env.GOOGLE_CLOUD_PSWD,
    database: 'ccps_db'
})*/
/*export const database = createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Msqlgn220723-',
    database: 'ccps_db'
})*/
export const database = createPool({
    host: process.env.FMSH_HOST,
    port: process.env.FMSH_PORT,
    user: process.env.FMSH_USER,
    password: process.env.FMSH_PASSWORD,
    database: process.env.FMSH_DATABASE
})