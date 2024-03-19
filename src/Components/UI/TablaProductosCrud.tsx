import { useLiveQuery } from 'dexie-react-hooks';
import React, { useContext, useState } from 'react'
import { EditContext } from '../../Context/EditContext';
import { db } from '../../DB/db';
import { TProductoContext, TProducto } from '../../Interfaces/IContext';
import { Prompt } from './Prompt';
import { IProducto } from '../../Interfaces';

interface ITable{
    clases:string,
    sel:string
}
export const TablaProductosCrud = ({clases='', sel=""}:ITable ) => {
    const {data, setData, resetData} = useContext(EditContext) as TProductoContext;
    const [selected, setSelected] = useState<IProducto>();
    const [pState, setPState] = useState(false);

    const productos = useLiveQuery(
        () => {
            return db.productos.orderBy('nombre').toArray().then(res=>res.filter((e)=>e.super===sel));
        }
    ,[sel]);

    const eliminar = async (prd:IProducto) => {
        
        try {
            let resp = await db.productos.where('id').anyOf(prd.id).delete();
            if(resp){
                await db.compra.update(sel+"",{
                    total:  productos!.filter((sup)=>sup.super === sel)!.reduce((a,o)=>a+o.precio,0) - prd.precio,
                    cantidad: productos!.filter((sup)=>sup.super === sel).length - 1
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const editar = async (id:string) => {
        try {
            let resp = await db.productos.get(id) as TProducto;
            setData(resp);
            document.getElementById('nombre')?.focus();
        } catch (error) {
            console.log(error)
        }    
    }
    const chekar = async (id:string, status:boolean) => {
        try {
            let resp = await db.productos.get(id) as TProducto;
            const edited = await db.productos.update(resp.id+"",{...resp, chekar:status});
        } catch (error) {
            alert('Ocurrio un error, reportar: '+ JSON.stringify({error}))
            console.log(error)
        }    
    }
    
  return (
    <>
        {
            pState && 
            <Prompt cssClass='text-center' title='¿Borrar producto?' text='Se borrará solo el producto seleccionado' 
                onCancel={()=>setPState(false)} onConfirm={()=>{eliminar(selected!); resetData(); setPState(false);}}/>
        }
        <div className={clases}>
            <table className='sticky-header'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th className='headcol'>NOMBRE</th>
                        <th>PRECIO</th>
                        <th>CANTIDAD</th>
                        <th>SUM/DESC</th>
                        <th>TOTAL</th>
                        <th>&nbsp;&nbsp;ACCIONES&nbsp;&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos?.length === 0 ? <tr><td className='headcol text-center' colSpan={7}>Sin datos</td></tr> : 
                        productos?.map((p,p_i)=>{
                            return <tr key={p_i} tabIndex={0} className={p.chekar ? 'c-llpink' : 'c-trans'}>
                                <td>
                                    <div className={`${p.chekar && 'selected-row'} ps-1`}>
                                        {p_i}
                                    </div>                            
                                </td>
                                <td className={ p.chekar ? 'headcol c-llpink' : 'headcol'}><b>{p.nombre}</b></td>
                                <td>{p.precio}</td>
                                <td>{p.cantidad}</td>
                                <td>{p.sum_desc}</td>
                                <td>{p.total}</td>
                                <td>
                                    <button className='btn acciones-btn c-bred text-d' onClick={()=>{
                                            setSelected(p);
                                            setPState(true);
                                        }}>
                                        ✖
                                    </button>&nbsp;
                                    <button className='btn acciones-btn c-lyellow text-d' onClick={()=>{editar(p.id)}}>
                                        ✎
                                    </button>
                                    <input type="checkbox" className='checkbox-md' onChange={(e)=>{
                                        chekar(p.id, e.target.checked)
                                    }} checked={p.chekar}/>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
  )//<td className='headcol'><b className={p.chekar ? 'c-llpink' : ''}>{p.nombre}</b></td>
}
/*

id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  descuento?: number;
  categoria?: string;
  total:number
* */