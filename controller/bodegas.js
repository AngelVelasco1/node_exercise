var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
import { Length } from 'class-validator';
export class Bodegas {
    constructor(ID, NOM, ID_RES, EST) {
        this.ID = ID;
        this.NOM = NOM;
        this.ID_RES = ID_RES;
        this.EST = EST;
    }
}
__decorate([
    Expose({ name: 'id' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else
            throw { status: 200, message: 'El id contiene parametros incorrectos' };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Bodegas.prototype, "ID", void 0);
__decorate([
    Expose({ name: "nombre" }),
    Transform(({ value }) => {
        if (/^[a-z A-Z]+$/.test(value))
            return value;
        else
            throw { status: 200, message: 'El nombre contiene caracteres erroneos' };
    }, { toClassOnly: true }),
    Length(1, 255, { message: 'El nombre debe tener entre 1 y 255 caracteres' }),
    __metadata("design:type", String)
], Bodegas.prototype, "NOM", void 0);
__decorate([
    Expose({ name: "id_responsable" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 200, message: 'El id contiene parametros incorrectos' };
    }, { toClassOnly: true }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], Bodegas.prototype, "ID_RES", void 0);
__decorate([
    Expose({ name: "estado" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 200, message: 'El estado contiene parametros incorrectos' };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Bodegas.prototype, "EST", void 0);
//# sourceMappingURL=bodegas.js.map