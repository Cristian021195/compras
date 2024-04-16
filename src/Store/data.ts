/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { db } from '../DB/db'
import { ICompra, IProducto } from '../Interfaces'

interface IZdata {
    product: IProducto | null,
    productos: IProducto[],
    compras: ICompra[],
    changeProducts: (v:string) => void
    selectProduct: (v:string) => void
    //selectProduct: (v:string) => IProducto
}

export const ZData = create<IZdata>((set) => ({
    product: null,
    productos: [],
    compras: [],
    changeProducts: (v:string)=>set((state:IZdata) => {
        return {productos: state.productos.filter(p=>p.super === v)}
    }),
    selectProduct: (v:string)=>set((state:IZdata) => {
        return {product: state.productos.find(p=>p.id === v)}
    }),
}))


/* 
const listado = useLiveQuery(
    async () => {
        let [compras, productos] = await Promise.all([db.compra.toArray(),db.productos.toArray()]);
        compras.length > 0 && changeSelectedSuper(compras[0].super+"");
        return {
            compras, 
            productos
        };
    }
);

*/