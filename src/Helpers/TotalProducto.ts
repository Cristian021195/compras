import { IProducto } from '../Interfaces';
export const totalProducto = (array:IProducto[]) => {
    let cont = 0;
    if(array !== undefined){
        array.forEach((e:IProducto,e_i:number)=>{
            if(e.chekar){cont += e.total;}        
        })
    }    
    return cont;
}

export const cantidadProductos = (array:IProducto[]) =>  array ? array.length : 0;

export const cantidadTotalProductos = (array:IProducto[]) => {
    let cont = 0;
    if(array !== undefined){
        array.forEach((e:IProducto,e_i:number)=>{
            if(e.chekar){cont += e.cantidad;}        
        })
        return cont;
    }
    return 0;    
}
