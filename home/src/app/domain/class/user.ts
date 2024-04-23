import { Generic } from "./generic";

export class User extends Generic{
    name!: string;
    lastName!: string;
    typeDocument!: string;
    numberDocument!: string;
    mail!: string;
    password!: string;
    state!: number;
    rol!: string;
}
