import React, { useContext, useEffect, useRef, useState } from 'react'
import { useFormAnimation } from '../../Hooks';
import {FormEvent} from 'react'
import { db } from '../../DB/db';
import {v4 as uuid} from "uuid";
import { EditContext } from '../../Context/EditContext';
import { TProductoContext, TProducto } from '../../Interfaces/IContext';
import { useLocation } from 'react-router-dom'
import { beep } from '../../Helpers';
import { Add, Clean, Search, Trash } from '../Icons';
import { AccordionParent } from '../UI/AccordeonParent';
import { IProducto } from '../../Interfaces';
import { Prompt, Toast } from '../UI';
const borrarCompras = async () => {
    try {
        db.productos.clear();
    } catch (error) {
        console.log('Hubo un error, revise la consola: '+error)
    }
}

export const ProductoNuevoForm = () => {
    const {data, setData} = useContext(EditContext) as TProductoContext | any;
    const {minimize, setMinimize} = useFormAnimation();
    const [sound, setSound] = useState(JSON.parse(localStorage.getItem('sound') || 'false'));
    const [filtrados, setFiltrados] = useState<TProducto[]>([]);
    const [alerta,setAlerta] = useState(false);
    const [promptAlert,setPromptAlert] = useState(false);
    const [alertaDetalle, setAlertaDetalle] = useState({});

    const nombre = useRef<HTMLInputElement>(null);

    const limpiar = () => { setData({id:'', nombre:'', precio:0, cantidad:1, descuento:0, sum_desc: 0, categoria:'cualquiera', total:0, chekar:false}); setFiltrados([]); }

    const buscar = async()=>{
        //console.log(nombre.current?.value);
        if(nombre.current?.value.length! > 0){
            let prod = await db.productos.filter(pd=> new RegExp(nombre.current?.value || '', "i").test(pd.nombre)).toArray();
            setFiltrados(prod);
        }
    }

    const cargaProducto = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);   let data = Object.fromEntries(formData);

        data.total = ((parseFloat(data.precio.toString()) * parseFloat(data.cantidad.toString())) + parseFloat(data.sum_desc.toString()) * (1-parseInt(data.descuento.toString())/100))+"";
        e.currentTarget.reset();

        try {

            if(data?.id){
                const id = await db.productos.update(data?.id+"",{
                    nombre: data?.nombre+"",
                    precio: parseFloat(data?.precio+""),
                    cantidad: parseInt(data?.cantidad+""),
                    descuento: parseFloat(data?.descuento+""),
                    sum_desc: parseFloat(data?.sum_desc+""),
                    categoria: data?.categoria+"",
                    total: parseFloat(data?.total+""),
                    chekar:true
                });
                if(id){
                    if(sound){
                        beep();
                    }else{
                        setAlerta(true);
                        setAlertaDetalle({color:"#f5f5f5", bgcolor:"#008009", title:"Edicion",text:"¡Editado!", status:true});
                        setTimeout(() => {
                            setAlerta(false);
                        }, 4000);
                    }
                }
                limpiar();
            }else{
                const id = await db.productos.add({
                    id: uuid(),
                    nombre: data?.nombre+"",
                    precio: parseFloat(data?.precio+""),
                    cantidad: parseInt(data?.cantidad+""),
                    descuento: parseFloat(data?.descuento+""),
                    sum_desc: parseFloat(data?.sum_desc+""),
                    categoria: data?.categoria+"",
                    total: parseFloat(data?.total+""),
                    chekar:true
                });
                if(id){
                    if(sound){
                        beep();
                        setAlerta(true);
                        setAlertaDetalle({color:"#f5f5f5", bgcolor:"#008009", title:"Nuevo Producto",text:"¡Agregado!", status:true});
                        setTimeout(() => {
                            setAlerta(false);
                        }, 4000);
                    }else{
                        setAlerta(true);
                        setAlertaDetalle({color:"#f5f5f5", bgcolor:"#008009", title:"Nuevo Producto",text:"¡Agregado!", status:true});
                        setTimeout(() => {
                            setAlerta(false);
                        }, 4000);
                        //alert('¡Cargado!');
                    }
                }
                limpiar();
            }
            //setData({id:'', cantidad:1, precio:0, total:0, categoria:'cualquiera', nombre:'', descuento:0})
            //setData("")
        } catch (error) {
            console.log(error)
            alert('¡Error, revisar la consola!');
            setData({id:'', cantidad:1, precio:0, total:0, categoria:'cualquiera', sum_desc:0 ,nombre:'', descuento:0})
            //setData("")
        }
    }
  return ( //className={minimize ? 'd-none' : 'd-block'}
    <>
    {alerta && <Toast {...alertaDetalle}/>}
    {promptAlert && <Prompt onConfirm={()=>{borrarCompras(); setPromptAlert(false);}} onCancel={ ()=>{setPromptAlert(false)} }/>}
    <form onSubmit={cargaProducto} style={{borderRadius:'0.5em', border:'1px solid #ffd8ca', position:'relative', zIndex:0}} className='col-4'>
        <div  style={{borderRadius:'0.5em 0.5em 0 0',backgroundColor:'#fdeae3', padding:'1rem'}}>
            <AccordionParent state={minimize}>

                <div className='costado'>
                    <div>
                        <label htmlFor="nombre" className='p-2'>Producto 🛒/🔎: </label>
                        <input type="text" ref={nombre} name='nombre' id='nombre' placeholder='Galletas x250' minLength={3} maxLength={30} required defaultValue={data?.nombre}/>
                    </div>

                    <div>
                        <label htmlFor="precio" className='p-2'>Precio <b>($)</b>:</label>
                        <input type="number" name="precio" min={0} max={1000000} step='0.01' required value={data?.precio} onChange={(e)=>{setData({...data, precio: e.target.value})}}/>
                    </div>
                </div>

                <div className='costado'>
                    <div>
                        <label htmlFor="cantidad" className='p-2'>Cantidad <b>(¾)</b>:</label>
                        <input type="number" name="cantidad" min={1} max={1000000} required value={data?.cantidad} onChange={(e)=>{setData({...data, cantidad: e.target.value})}}/>
                    </div>

                    <div>
                        <label htmlFor="sum_desc" className='p-2'>suma/desc <b>(±) </b>: </label>
                        <input type="number" name="sum_desc" min={-999999} max={1000000} step='0.01' required value={data?.sum_desc} onChange={(e)=>{setData({...data, sum_desc: e.target.value})}}/>
                    </div>
                </div>

                <label htmlFor="descuento" style={{padding:'1em', display:'none'}} className='d-none align-items-center justify-content-between flex-wrap'>Descuento (%): <input type="number" name="descuento" min={0} required value={data?.descuento} onChange={(e)=>{setData({...data, descuento: e.target.value})}}/>
                </label>
                <input type="hidden" name="id" defaultValue={data?.id}/>
                <label htmlFor="categoria" style={{padding:'1em', display:'none', justifyContent:'space-between', alignItems:'end'}}>Categoria: 
                    <select name="categoria" required defaultValue={data?.categoria}>
                        <option value="cualquiera">cualquiera</option>
                        <option value="limpieza">limpieza</option>
                        <option value="comestibles">comestibles</option>
                        <option value="bazar">bazar</option>
                        <option value="electrodomesticos">electrodomésticos</option>
                    </select>
                </label>
            </AccordionParent>
        </div>
        <button type="submit" className='btn text-w m-1 p-1' style={{backgroundColor:'#66BB6A'}}>
            <Add width={14} height={14}/>
        </button>
        <button type="reset" className='btn text-w m-1 p-1' style={{backgroundColor:'#00897B'}} onClick={limpiar}>
            <Clean width={14} height={14}/>
        </button>
        <button type="button" className='btn text-w m-1 p-1' style={{backgroundColor:'#FF5252'}} onClick={()=>{
            setPromptAlert(true);
        }}>
            <Trash width={14} height={14}/>
        </button>
        <button type="button" className='btn text-w m-1 p-1' style={{backgroundColor:'dodgerblue'}} onClick={buscar}>
            <Search width={14} height={14}/>
        </button>
        <button type='button' className={minimize ? 'btn rotate-left' : 'btn rotate-right'}  style={{backgroundColor:'coral', color:'whitesmoke', padding:'0.6rem 0.3rem 0.6rem 0.3rem', margin:'0.4em'}}
        onClick={()=>setMinimize(!minimize)}>&nbsp;▲&nbsp;</button>
        <div className='d-flex justify-content-center pb-2'>
            {filtrados.length > 0 && <fieldset className='pop-up'>
                <legend><small>Encontrados: </small></legend>
                <p><small>Producto, Precio, Cantidad, Total</small></p>
                {filtrados.map((fil,fili)=><p key={fili}><small>{fil.nombre}, {fil.precio}, {fil.cantidad}, {fil.total}</small></p>)}
            </fieldset>}
        </div>
    </form>
    </>
  )
}
/*
d-flex align-items-center justify-content-between flex-wrap
d-flex align-items-center justify-content-between flex-wrap
*/