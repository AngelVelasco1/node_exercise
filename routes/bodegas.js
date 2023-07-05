//? Dependencies
import mysql from 'mysql';

import {router} from 'express';

const storageBodegas = Router();
let conx;
storageBodegas.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    conx = mysql.createPool(myConfig);
    next();
})

//? List bodegas sorted alphabetically
storageBodegas.get('/', (req, res) => {
    conx.query(
        'SELECT * FROM bodegas ORDER BY nombre ASC',
        (err, result, fil) => {
            res.json(JSON.stringify(result));
        }
    )
});



export default storageBodegas;