import { create } from 'zustand'
import { IMainForm, IProducto } from '../Interfaces'

export const ZMainForm = create<IMainForm>((set) => ({
    selected_prod: null,
    super_name: '',
    selected_super: '',
    nombre:'',
    id:'',
    categoria:'',
    total:0,
    chekar:true,
    precio:1,
    cantidad:1,
    sum_desc:0,
    changeSelectedSuper: (v:string) => set((state:IMainForm) => {
        return {selected_super: v}
    }),
    changeSuper: (v:string) => set((state:IMainForm) => {
        return {super_name: v}
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
    partialReset: () => set((state:IMainForm) => {
        state.nombre='';
        state.precio=1;
        state.cantidad=1;
        state.sum_desc=0;
        return {
            id:'',
            nombre:'',
            precio:1,
            cantidad:1,
            sum_desc:0,
            categoria:'cualquiera',
            total:0,
            chekar:true,
            super:''
        }        
    }),
    setSelectedProd: (v:IProducto) => set((state:IMainForm)=>{
        return {selected_prod: v}
    }),
    cleanProd: ()=>set((state:IMainForm)=>{
        state.id='';
        state.nombre='';
        state.precio=1;
        state.cantidad=1;
        state.sum_desc=0;
        state.categoria='cualquiera';
        state.total=0;
        state.chekar=true;
        const p:IProducto = {
            id:'',
            nombre:'',
            precio:0,
            cantidad:0,
            descuento:0,
            sum_desc:0,
            categoria:'cualquiera',
            total:0,
            chekar:true,
            super:'',
        }
        return {selected_prod:p}
    })
}))

//