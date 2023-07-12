//? Dependencies
import mysql from "mysql2";
import express from 'express';
import { plainToClass } from 'class-transformer';
import { Bodegas } from '../controller/bodegas.js';

const proxyBodegas = express();


let conx;
proxyBodegas.use((req, res, next) => {
    try {
        let myConfig = JSON.parse(process.env.MY_CONNECT);
        conx = mysql.createPool(myConfig);
        let data = plainToClass(Bodegas, req.body, { excludeExtraneousValues: true });
        req.body = JSON.parse(JSON.stringify(data));
        next();
    }
    catch (err) {
        console.error('Error de conexion:', err.message);
        res.status(500);
    }
})

export default proxyBodegas;
export  {conx};