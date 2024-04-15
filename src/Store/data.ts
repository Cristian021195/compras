/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { db } from '../DB/db'

export const ZData = create((set) => ({
    productos: [],
    getProductos: async () => {
        let p = await db.productos.toArray();
        set(()=>({productos:p}))
    }
    //input:"",
    //selected: null,
    //results_mapbox: null,
    //results_openwmap: null,
    //loading:false,
    //error:"",
    /*changeInput: debounce( async (v:string)=> {
        try {
            set(()=>({loading:true}))
            const data = await datosClimap(v);
            //throw new Error("Nani?");
            const jsondata:IMapbox = await data.json();
            if(jsondata){
                const owdata = await datosOWM(jsondata.features[0].center[1], jsondata.features[0].center[0]);
                const owjsondata: IOpenWeatherMap = await owdata.json();
                set(()=>({results_openwmap: owjsondata}))
            }
            set(()=>({results_mapbox: jsondata}))
            set(()=>({selected: jsondata.features[0]}))
        } catch (err: any) {
            set(()=>({error:err?.message}));//console.log(err);
        } finally {
            set(()=>({loading:false}))
        }
        
        set(()=>({input: v}))

    }, 1500) as ()=>unknown,*/
    //changeSelected: (f:Feature | undefined)=> set(()=>({selected: f})),
    //getResults: ()=> set((state:ISearch)=>({results_mapbox: state.results_mapbox})),
    //getResultsOWM: (val: IOpenWeatherMap)=> set(()=>({results_openwmap: val})),
    //setError: (val:string)=> set(()=>({error: val})),
    //setLoading: (val:boolean)=>set(()=>({loading:val}))
}))