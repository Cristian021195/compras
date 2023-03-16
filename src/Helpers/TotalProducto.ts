import { IProducto } from '../Interfaces';
export const totalProducto = (array:IProducto[]) => {
    let cont = 0;
    array.forEach((e:IProducto,e_i:number)=>{
        if(e.chekar){cont += e.total;}        
    })
    return cont;
}

export const cantidadProductos = (array:IProducto[]) => {
    return array.length;
}

export const cantidadTotalProductos = (array:IProducto[]) => {
    let cont = 0;
    array.forEach((e:IProducto,e_i:number)=>{
        if(e.chekar){cont += e.cantidad;}        
    })
    return cont;
}
