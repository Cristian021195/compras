import { IProducto } from "./IProducto";

export interface IMainForm {
    selected_prod: IProducto | null
    id: string,
    total:number;
    chekar:boolean;
    categoria: string,
    super_name: string,
    selected_super: string,
    nombre: string,
    precio: number,
    cantidad: number,
    sum_desc: number,
    changeSelectedSuper: (v:string)=>void,
    changeSuper: (v:string)=>void,
    changeNombre: (v:string)=>void,
    changePrecio: (v:number)=>void,
    changeCantidad: (v:number)=>void,
    changeSumDesc: (v:number)=>void,
    partialReset: ()=>void,
    setSelectedProd: (v:IProducto)=>void,
    cleanProd: ()=>void
}