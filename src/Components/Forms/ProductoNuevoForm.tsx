import React, { useContext, useEffect } from 'react'
import { useFormAnimation } from '../../Hooks';
import {FormEvent} from 'react'
import { db } from '../../DB/db';
import {v4 as uuid} from "uuid";
import { EditContext } from '../../Context/EditContext';
import { TProductoContext, TProducto } from '../../Interfaces/IContext';
import { useLocation } from 'react-router-dom'
/*
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    descuento?: number;
    categoria?: string;
    total:number,
    chekar:boolean

*/
const borrarCompras = async () => {
    let resp = window.confirm("¿Borrar toda la lista de compras?")
    if(resp){

        try {
            db.productos.clear();
            alert('¡Datos borrados!')
        } catch (error) {
            alert('Hubo un error, revise la consola.')
        }

    }
}

export const ProductoNuevoForm = () => {
    const {data, setData} = useContext(EditContext) as TProductoContext | any;
    const {minimize, setMinimize} = useFormAnimation();

    const limpiar = () => { setData({id:'', nombre:'', precio:0, cantidad:0, descuento:0, categoria:'cualquiera', total:0, chekar:false}) }

    const cargaProducto = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);   let data = Object.fromEntries(formData);

        data.total = ((parseFloat(data.precio.toString()) * parseFloat(data.cantidad.toString()))*(1-parseInt(data.descuento.toString())/100))+"";
        e.currentTarget.reset();


        try {

            if(data?.id){
                const id = await db.productos.update(data?.id+"",{
                    nombre: data?.nombre+"",
                    precio: parseFloat(data?.precio+""),
                    cantidad: parseInt(data?.cantidad+""),
                    descuento: parseFloat(data?.descuento+""),
                    categoria: data?.categoria+"",
                    total: parseFloat(data?.total+""),
                    chekar:true
                });
                if(id){alert('¡Editado!');}
                limpiar();
            }else{
                const id = await db.productos.add({
                    id: uuid(),
                    nombre: data?.nombre+"",
                    precio: parseFloat(data?.precio+""),
                    cantidad: parseInt(data?.cantidad+""),
                    descuento: parseFloat(data?.descuento+""),
                    categoria: data?.categoria+"",
                    total: parseFloat(data?.total+""),
                    chekar:true
                });
                if(id){alert('¡Cargado!');}
                limpiar();
            }
            //setData({id:'', cantidad:1, precio:0, total:0, categoria:'cualquiera', nombre:'', descuento:0})
            //setData("")
        } catch (error) {
            console.log(error)
            alert('¡Error, revisar la consola!');
            setData({id:'', cantidad:1, precio:0, total:0, categoria:'cualquiera', nombre:'', descuento:0})
            //setData("")
        }
    }
  return (
    <form onSubmit={cargaProducto} style={{borderRadius:'0.5em', border:'1px solid #ffd8ca'}} className='col-4'>
        <div className={minimize ? 'd-none' : 'd-block'} style={{borderRadius:'0.5em 0.5em 0 0',backgroundColor:'#fdeae3'}}>
        <label htmlFor="nombre" style={{padding:'1em', display:'flex', justifyContent:'space-between', alignItems:'end'}}>Producto: 
            <input type="text" name='nombre' placeholder='Galletas x250' minLength={5} maxLength={30} required defaultValue={data?.nombre}/>
        </label>
        <label htmlFor="precio"  style={{padding:'1em', display:'flex', justifyContent:'space-between', alignItems:'end'}}>Precio: (con punto)
            <input type="number" name="precio" min={0} step='0.01' required defaultValue={data?.precio}/>
        </label>
        <label htmlFor="number" style={{padding:'1em', display:'flex', justifyContent:'space-between', alignItems:'end'}}>Cantidad: (n)
            <input type="number" name="cantidad" min={1} required defaultValue={data?.cantidad}/>
        </label>
        <label htmlFor="descuento" style={{padding:'1em', display:'flex', justifyContent:'space-between', alignItems:'end'}}>Descuento (%): 
            <input type="number" name="descuento" min={0} required defaultValue={data?.descuento}/>
        </label>
        <input type="hidden" name="id" defaultValue={data?.id}/>
        <label htmlFor="categoria" style={{padding:'1em', display:'flex', justifyContent:'space-between', alignItems:'end'}}>Categoria: 
            <select name="categoria" required value={data?.categoria}>
                <option value="cualquiera">cualquiera</option>
                <option value="limpieza">limpieza</option>
                <option value="comestibles">comestibles</option>
                <option value="bazar">bazar</option>
                <option value="electrodomesticos">electrodomésticos</option>
            </select>
        </label>
        </div>
        <button type="submit" className='btn' style={{backgroundColor:'coral', color:'whitesmoke', padding:'0.5em', margin:'0.4em'}}>Cargar</button>
        <button type="reset" className='btn' style={{backgroundColor:'dodgerblue', color:'whitesmoke', padding:'0.5em', margin:'0.4em'}} onClick={limpiar}>Limpiar</button>
        <button type="button" className='btn' style={{backgroundColor:'dodgerblue', color:'whitesmoke', padding:'0.5em', margin:'0.4em'}} onClick={borrarCompras}>Borrar Compras</button>
        <button type='button' className={minimize ? 'btn rotate-right' : 'btn rotate-left'}  style={{backgroundColor:'coral', color:'whitesmoke', padding:'0.5em', margin:'0.4em'}}
        onClick={()=>setMinimize(!minimize)}>&nbsp;▲&nbsp;</button>
    </form>
  )
}
