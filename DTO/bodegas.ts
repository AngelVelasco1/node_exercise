//? VALIDACIONES
import { Expose, Transform, Type } from 'class-transformer';
export class Bodegas {
    @Expose({ name: 'id' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number') 
            return Math.floor(value);
        
        else 
            throw { status: 400, message: 'El id contiene parametros incorrectos' };},
            { toClassOnly: true })
    ID: number;
}


