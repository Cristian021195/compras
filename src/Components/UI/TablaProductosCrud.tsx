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
            setData(resp);
            //window.scrollTo({ top: 0, behavior: 'smooth' })
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
    <div className={clases}>
        <table className='sticky-header'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>NOMBRE</th>
                    <th>PRECIO</th>
                    <th>CANTIDAD</th>
                    <th>SUM/DESC</th>
                    <th>TOTAL</th>
                    <th>ACCIONES</th>
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
                        <td>{p.nombre}</td>
                        <td>{p.precio}</td>
                        <td>{p.cantidad}</td>
                        <td>{p.sum_desc}</td>
                        <td>{p.total}</td>
                        <td>
                            <button className='btn' style={{padding:'0.5em', backgroundColor:'#ffa892'}} onClick={()=>{eliminar(p.id)}}>
                                <b style={{color:'#4e4e4e'}}>✖</b>
                            </button>&nbsp;
                            <button className='btn' style={{padding:'0.5em', backgroundColor:'#ffe68d'}} onClick={()=>{editar(p.id)}}>
                                <b style={{color:'#4e4e4e'}}>✎</b>
                            </button>
                            <input type="checkbox" style={{height:'1.5em', width:'1.5em',verticalAlign:'middle'}} onChange={(e)=>{chekar(p.id, e.target.checked)}} defaultChecked={p.chekar}/>
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