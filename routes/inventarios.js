//? Dependencies
import mysql from 'mysql2';
import dotenv from 'dotenv';
import {Router} from 'express';
//? Enviroment variables
dotenv.config("../");

const storageInventarios = Router();

//? Variables
let conx;
const myConfig = JSON.parse(process.env.MY_CONNECT);

//? Use database
storageInventarios.use((req, res, next) => {
    try {
        conx = mysql.createPool(myConfig);
        next()
    } catch (err) {
        console.error('Error de conexion:', err.message);
        res.status(500);
    }   
});


export default storageInventarios;