import { useLiveQuery } from 'dexie-react-hooks';
import React, { useContext, useState } from 'react'
import { EditContext } from '../../Context/EditContext';
import { db } from '../../DB/db';
import { TProductoContext, TProducto } from '../../Interfaces/IContext';
import { Prompt } from './Prompt';
import { IProducto } from '../../Interfaces';
import { ZMainForm } from '../../Store';

interface ITable{
    clases:string,
    sel:string
}
export const TablaProductosCrud = () => {
    const {selected_super, changeSelectedSuper,selected_prod, setSelectedProd} = ZMainForm((state)=>state);
    //const {data, setData, resetData} = useContext(EditContext) as TProductoContext;
    const [sel_prod, setSelProd] = useState<IProducto>();
    const [pState, setPState] = useState(false);
    const listado = useLiveQuery(
        async () => {
            let productos = (await db.productos.toArray()).filter(p=>p.super === selected_super);
            return {
                productos
            };
        },
        [selected_super]
    );

    const eliminar = async (prod:IProducto) => {
        try {
            let resp = await db.productos.where('id').anyOf(prod.id).delete();
            if(resp){
                await db.compra.update(selected_super+"",{
                    total:  listado!.productos?.filter((sup)=>sup.super === selected_super)!.reduce((a,o)=>a+o.precio,0) - prod.precio,
                    cantidad: listado!.productos?.filter((sup)=>sup.super === selected_super).length - 1
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const chekar = async (id:string, status:boolean) => {
        try {
            let resp = await db.productos.get(id) as TProducto;
            const edited = await db.productos.update(resp.id+"",{...resp, chekar:status});
        } catch (error) {
            alert('Ocurrio un error al marcar producto: ');
            console.log(error)
        }    
    }

    return (
        <>
            {
                pState && 
                <Prompt cssClass='text-center' title='¿Borrar producto?' text='Se borrará solo el producto seleccionado' 
                    onCancel={()=>setPState(false)} onConfirm={()=>{eliminar(sel_prod!); setPState(false);}}/>
            }
            <div className='stripped scroll-all mb-01'>
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
                            listado?.productos?.length === 0 ? <tr><td className='headcol text-center' colSpan={7}>Sin datos</td></tr> : 
                            listado?.productos?.map((p,p_i)=>{
                                return <tr key={p_i} tabIndex={0} className={p.chekar ? 'c-llpink' : 'c-trans'}>
                                    <td>
                                        <div className={`${p.chekar && 'selected-row'} ps-1`}>
                                            {p_i}
                                        </div>                            
                                    </td>
                                    <td className={ p.chekar ? 'check-hc headcol' : 'headcol nocheck-hc'}><b>{p.nombre}</b></td>
                                    <td>{p.precio}</td>
                                    <td>{p.cantidad}</td>
                                    <td>{p.sum_desc}</td>
                                    <td>{p.total}</td>
                                    <td>
                                        <button className='btn acciones-btn c-bred text-d' onClick={()=>{
                                            setSelProd(p);
                                            setPState(true);
                                        }}>
                                            ✖
                                        </button>&nbsp;
                                        <button className='btn acciones-btn c-lyellow text-d' onClick={()=>{
                                            setSelectedProd(p);
                                        }}>
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
    )
}