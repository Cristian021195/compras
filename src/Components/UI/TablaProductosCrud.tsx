import { useLiveQuery } from 'dexie-react-hooks';
import React, { useContext } from 'react'
import { EditContext } from '../../Context/EditContext';
import { db } from '../../DB/db';
import { TProductoContext, TProducto } from '../../Interfaces/IContext';

const eliminar = async (id:string) => {
    let confirm = window.confirm("¿Eliminar Producto?");
    if(confirm){
        try {
            let resp = await db.productos.where('id').anyOf(id).delete();
        } catch (error) {
            alert('Hubo error, revisar la consola')
            console.log(error)
        }
    }    
}

interface ITable{
    clases:string
}
export const TablaProductosCrud = ({clases=''}:ITable) => {
    const {data, setData} = useContext(EditContext) as TProductoContext;
    const productos = useLiveQuery(
        //() => db.productos.toArray() .orderBy('name')
        () => db.productos.orderBy('nombre').toArray()
    );
    const editar = async (id:string) => {
        try {
            let resp = await db.productos.get(id) as TProducto;
            setData(resp)
        } catch (error) {
            console.log(error)
        }    
    }
    
  return (
    <div style={{overflowX:'scroll'}} className={clases}>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>NOMBRE</th>
                    <th>PRECIO</th>
                    <th>CANTIDAD</th>
                    <th>DESCUENTO</th>
                    <th>CATEGORIA</th>
                    <th>TOTAL</th>
                    <th>ACCIONES</th>
                </tr>
            </thead>
            <tbody>
                {productos?.map((p,p_i)=>{
                    return <tr key={p_i} tabIndex={0}>
                        <td>{p_i}</td>
                        <td>{p.nombre}</td>
                        <td>{p.precio}</td>
                        <td>{p.cantidad}</td>
                        <td>{p.descuento}</td>
                        <td>{p.categoria}</td>
                        <td>{p.total}</td>
                        <td>
                            <button className='btn' style={{padding:'0.5em', backgroundColor:'#ffa892'}} onClick={()=>{eliminar(p.id)}}>
                                <b style={{color:'#4e4e4e'}}>✖</b>
                            </button>&nbsp;
                            <button className='btn' style={{padding:'0.5em', backgroundColor:'#ffe68d'}} onClick={()=>{editar(p.id)}}>
                                <b style={{color:'#4e4e4e'}}>✎</b>
                            </button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
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