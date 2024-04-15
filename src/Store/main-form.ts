import { create } from 'zustand'        
import { Exchange, IConfig, TFont, TSound, TTheme } from '../Types';

interface IMainForm {
    super: string,
    selected_super: string,
    nombre: string,
    precio: number,
    cantidad: number,
    sum_desc: number
}

export const ZMainForm = create<IMainForm>((set) => ({
    super: '',
    selected_super: '',
    nombre:'',
    precio:0,
    cantidad:0,
    sum_desc:0,
    changeSelectedSuper: (v:string) => set((state:IMainForm) => {
        return {selected_super: v}
    }),
    changeSuper: (v:string) => set((state:IMainForm) => {
        return {super: v}
    }),
    changeNombre: (v:string) => set((state:IMainForm) => {
        return {nombre: v}
    }),
    changePrecio: (v:number) => set((state:IMainForm) => {
        return {precio: v}
    }),
    changeCantidad: (v:number) => set((state:IMainForm) => {
        return {cantidad: v}
    }),
    changeSumDesc: (v:number) => set((state:IMainForm) => {
        return {sum_desc: v}
    }),
    partialReset: (v:number) => set((state:IMainForm) => {
        state.nombre='';
        state.precio=0;
        state.cantidad=0;
        state.sum_desc=0;
        return {
            nombre:'',
            precio:0,
            cantidad:0,
            sum_desc:0
        }        
    }),
}))

//