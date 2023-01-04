export interface IProducto {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    descuento?: number;
    categoria?: string;
    total:number,
    chekar:boolean
  }
  