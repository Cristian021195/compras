import { IProducto } from "./IProducto";

export type TProductoContext = {
    data:IProducto;
    setData: (value:IProducto)=>void;
}

export type TProducto = {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    sum_desc: number;
    descuento?: number;
    categoria?: string;
    total:number,
    chekar:boolean
}
  