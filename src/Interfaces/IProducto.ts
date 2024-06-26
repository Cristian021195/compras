export interface IProducto {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    descuento?: number;
    sum_desc: number;
    categoria?: string;
    total:number,
    chekar:boolean,
    super?:string
}

export interface ICompra {
  curr?:string,
  super?:string,
  fecha?:string,
  total?:number,
  cantidad?:number
}
  