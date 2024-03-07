import { useLiveQuery } from 'dexie-react-hooks';
import React, { useContext, useState } from 'react'
import { EditContext } from '../../Context/EditContext';
import { db } from '../../DB/db';
import { TProductoContext, TProducto } from '../../Interfaces/IContext';
import { Prompt } from './Prompt';

const eliminar = async (id:string) => {
    /*let confirm = window.confirm("¿Eliminar Producto?");
    if(confirm){
        try {
            let resp = await db.productos.where('id').anyOf(id).delete();
        } catch (error) {
            alert('Hubo error, revisar la consola')
            console.log(error)
        }
    }*/
    try {
        let resp = await db.productos.where('id').anyOf(id).delete();
    } catch (error) {
        console.log(error)
    }
}

interface ITable{
    clases:string
}
export const TablaProductosCrud = ({clases=''}:ITable) => {
    const {data, setData, resetData} = useContext(EditContext) as TProductoContext;
    const [selectedId, setSelectedId] = useState<string>("");
    const [pState, setPState] = useState(false);
    const productos = useLiveQuery(
        () => db.productos.orderBy('nombre').toArray()
    );
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
                onCancel={()=>setPState(false)} onConfirm={()=>{eliminar(selectedId); resetData(); setPState(false);}}/>
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
                    {productos?.map((p,p_i)=>{
                        return <tr key={p_i} tabIndex={0} style={{backgroundColor: p.chekar ? '#fcf1ed' : 'transparent'}}>
                            <td>
                                <div className={`${p.chekar && 'selected-row'}`} style={{paddingLeft:'10px'}}>
                                    {p_i}
                                </div>                            
                            </td>
                            <td className='headcol'><b>{p.nombre}</b></td>
                            <td>{p.precio}</td>
                            <td>{p.cantidad}</td>
                            <td>{p.sum_desc}</td>
                            <td>{p.total}</td>
                            <td>
                                <button className='btn acciones-btn' style={{backgroundColor:'#ffa892'}} onClick={()=>{
                                        setSelectedId(p.id);
                                        setPState(true);
                                    }}>
                                    <b style={{color:'#4e4e4e'}}>✖</b>
                                </button>&nbsp;
                                <button className='btn acciones-btn' style={{backgroundColor:'#ffe68d'}} onClick={()=>{editar(p.id)}}>
                                    <b style={{color:'#4e4e4e'}}>✎</b>
                                </button>
                                <input type="checkbox" style={{height:'1.5em', width:'1.5em',verticalAlign:'middle'}} onChange={(e)=>{
                                    chekar(p.id, e.target.checked)
                                }} checked={p.chekar}/>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </>
  )
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