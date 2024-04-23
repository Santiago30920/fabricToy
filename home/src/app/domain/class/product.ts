import { Generic } from "./generic";

export class Product extends Generic{
    id!: number;
    name!: string;
    quantity!: string;
    price!: string;
    state!: number;
    img!: string[];
    pdf!: string;
}
