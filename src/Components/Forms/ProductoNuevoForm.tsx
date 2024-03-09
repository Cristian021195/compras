import { useContext, useRef, useState } from 'react'
import { useFormAnimation } from '../../Hooks';
import {FormEvent} from 'react'
import { db } from '../../DB/db';
import {v4 as uuid} from "uuid";
import { EditContext } from '../../Context/EditContext';
import { TProductoContext, TProducto } from '../../Interfaces/IContext';
import { beep } from '../../Helpers';
import { Add, Clean, Search, Trash } from '../Icons';
import { AccordionParent } from '../UI/AccordeonParent';
import { Prompt, Toast } from '../UI';
const borrarCompras = async () => {
    try {
        db.productos.clear();
    } catch (error) {
        console.log('Hubo un error, revise la consola: '+error)
    }
}

export const ProductoNuevoForm = () => {
    const {data, setData, resetData} = useContext(EditContext) as TProductoContext | any;
    const {minimize, setMinimize} = useFormAnimation();
    const [sound, setSound] = useState(JSON.parse(localStorage.getItem('sound') || 'false'));
    const [filtrados, setFiltrados] = useState<TProducto[]>([]);
    const [alerta,setAlerta] = useState(false);
    const [promptAlert,setPromptAlert] = useState(false);
    const [promptDb,setPromptDb] = useState(false);
    const [alertaDetalle, setAlertaDetalle] = useState({});

    const nombre = useRef<HTMLInputElement>(null);

    const limpiar = () => { 
        resetData();
        setFiltrados([]); 
    }

    const buscar = async()=>{
        if(nombre.current?.value.length! > 0){
            let prod = await db.productos.filter(pd=> new RegExp(nombre.current?.value || '', "i").test(pd.nombre)).toArray();
            setFiltrados(prod);
        }else{
            nombre.current?.focus();
        }
    }

    const compartir = async () => {
        let prods = await db.productos.toArray(pr=>pr.map(pm=>{return {nombre:pm.nombre, precio:pm.precio}}));
        let formated = prods.map(fp=>`${fp.nombre}=${fp.precio}`);
        let str = formated.join('\n');

        let myData = {title: 'Capo',text: str}
        if (navigator.canShare(myData)) {
            await navigator.share(myData);
        }
    }

    const compar = async () => {
        let myData = {title: 'My title',text: 'My text'}
        if (navigator.canShare(myData)) {
            await navigator.share(myData);
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
                    setAlerta(true);
                    setAlertaDetalle({color:"#f5f5f5", bgcolor:"#66bb6a", title:"Edicion",text:"¡Editado!", status:true});
                    setTimeout(() => {
                        setAlerta(false);
                    }, 4000);
                    if(sound){ beep(); }
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
                    setAlerta(true);
                    setAlertaDetalle({color:"#f5f5f5", bgcolor:"#66bb6a", title:"Nuevo Producto",text:"¡Agregado!", status:true});
                    setTimeout(() => {
                        setAlerta(false);
                    }, 4000);
                    if(sound){ beep(); }
                }
                limpiar();
            }
        } catch (error) {
            console.log(error)
            alert('¡Error, revisar la consola!');
            resetData();
        }
    }
  return ( //className={minimize ? 'd-none' : 'd-block'}
    <>
    {alerta && <Toast {...alertaDetalle}/>}
    {promptAlert && <Prompt cssClass='text-center' title='¿Borrar compras?' text='Esto borrará todas las compras, no puede deshacerse.' onConfirm={()=>{borrarCompras(); resetData(); setPromptAlert(false);}} onCancel={ ()=>{setPromptAlert(false)} }/>}
    <form onSubmit={cargaProducto} style={{borderRadius:'0.5em', border:'1px solid #ffd8ca', position:'relative', zIndex:0}} className='col-4'>
        <div  style={{borderRadius:'0.5em 0.5em 0 0',backgroundColor:'#fdeae3', padding:'0 1rem 1rem 1rem'}}>
            <AccordionParent state={!minimize}>
                <div className='costado'>
                    <div>
                        <label htmlFor="nombre" className='p-2'>Producto 🛒/🔎: </label>
                        <input type="text" ref={nombre} name='nombre' id='nombre' placeholder='Galletas x250' minLength={3} maxLength={30} required defaultValue={data?.nombre}/>
                    </div>
                    <div>
                        <label htmlFor="precio" className='p-2'>Precio <b>($)</b>:</label>
                        <input type="number" name="precio" min={0} max={1000000} step='0.01' required value={data?.precio} 
                            onChange={(e)=>{setData({...data, precio: e.target.value })}}/>
                    </div>
                </div>
                <div className='costado'>
                    <div>
                        <label htmlFor="cantidad" className='p-2'>Cantidad <b>(¾)</b>:</label>
                        <input type="number" name="cantidad" min={1} max={1000000} required value={data?.cantidad} 
                            onChange={(e)=>{setData({...data, cantidad: e.target.value })}}/>
                    </div>

                    <div>
                        <label htmlFor="sum_desc" className='p-2'>suma/desc <b>(±) </b>: </label>
                        <input type="number" name="sum_desc" min={-999999} max={1000000} step='0.01' required value={data?.sum_desc} 
                            onChange={(e)=>{setData({...data, sum_desc: e.target.value })}}/>
                    </div>
                </div>

                <label htmlFor="descuento" style={{padding:'1em', display:'none'}} className='d-none align-items-center justify-content-between flex-wrap'>Descuento (%): <input type="number" name="descuento" min={0} required value={data?.descuento} onChange={(e)=>{setData({...data, descuento: parseFloat(e.target.value)})}}/>
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
        <button type="button" className='btn text-w m-1 p-1' style={{backgroundColor:'gainsboro', color:'black'}} onClick={
            compar
        }>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
            </svg>
        </button>
        <button type="button" className='btn text-w m-1 p-1' style={{backgroundColor:'gold', color:'black'}} onClick={compartir}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 18 16">
                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
            </svg>
        </button>
        <button type='button' className={minimize ? 'btn rotate-left' : 'btn rotate-right'}  style={{backgroundColor:'coral', color:'whitesmoke', padding:'0.6rem 0.3rem 0.6rem 0.3rem', margin:'0.4em'}}
        onClick={()=>setMinimize(!minimize)}>&nbsp;▲&nbsp;</button>
        <div className='d-flex justify-content-center'>
            {
            filtrados.length > 0 && <fieldset className='pop-up mb-2'>
                <legend><small>Encontrados: </small></legend>
                <p><small>Producto, Precio, Cantidad, Total</small></p>
                {
                    filtrados.map((fil,fili)=><p key={fili}><small>{fil.nombre}, {fil.precio}, {fil.cantidad}, {fil.total}</small></p>)
                }
            </fieldset>
            }
        </div>
    </form>
    </>
  )
}