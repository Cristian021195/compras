/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { db } from '../DB/db'
import { ICompra, IProducto } from '../Interfaces'

interface IProps{
    productos?: IProducto[],
    compras?: ICompra[]
}

export const ZData = create<any>((set:any) => ({
    productos: []
}))