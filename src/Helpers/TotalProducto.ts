import { IProducto } from '../Interfaces';
export const totalProducto = (array:IProducto[]) => {
    let cont = 0;
    array.forEach((e:IProducto,e_i:number)=>{
        if(e.chekar){cont += e.total;}        
    })
    return cont;
}
