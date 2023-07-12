import { Expose, Transform, Type } from 'class-transformer';
import { Length } from 'class-validator';

export class Bodegas {
    @Expose({ name: 'id' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')  
            return Math.floor(value);
        else 
            throw { status: 200, message: 'El id contiene parametros incorrectos' };
        }, { toClassOnly: true })
    ID: number;

    @Expose({ name: "nombre" })
    @Transform(({ value }) => {
        if (/^[a-z A-Z]+$/.test(value))
            return value
        else
            throw { status: 200, message: 'El nombre contiene caracteres erroneos'}
    }, {toClassOnly: true})
    @Length(1, 255, { message: 'El nombre debe tener entre 1 y 255 caracteres' })
    NOM: string;

    @Expose({ name: "id_responsable" })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
        return Math.floor(value);
        else
            throw { status: 200, message: 'El id contiene parametros incorrectos'}
    }, {toClassOnly: true})
    ID_RES: bigint;

    @Expose({ name: "estado" })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
        return Math.floor(value);
        else
            throw { status: 200, message: 'El estado contiene parametros incorrectos'}
    }, {toClassOnly: true})
    EST: number;

    constructor(ID: number, NOM: string, ID_RES: bigint, EST: number) {
        this.ID = ID;
        this.NOM = NOM;
        this.ID_RES = ID_RES;
        this.EST = EST;

    }
}


