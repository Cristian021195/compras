import { useContext, useRef, useState } from 'react'
import { useFormAnimation } from '../../Hooks';
import {FormEvent} from 'react'
import { db } from '../../DB/db';
import {v4 as uuid} from "uuid";
import { EditContext } from '../../Context/EditContext';
import { TProductoContext, TProducto,ICompra } from '../../Interfaces/';
import { ShareFile, ShareText, beep } from '../../Helpers';
import { Add, Calendar, Clean, Search, Share, Trash, Upload } from '../Icons';
import { AccordionParent } from '../UI/AccordeonParent';
import { Prompt, PromptDouble, Toast } from '../UI';
import { useLiveQuery } from 'dexie-react-hooks';
const borrarCompras = async () => {
    try {
        db.productos.clear();
    } catch (error) {
        console.log('Hubo un error, revise la consola: '+error)
    }
}
interface IProps{
    setSuperm: (e:string)=>void,
    total: number
}
export const ProductoNuevoForm = ({setSuperm, total}:IProps) => {
    const {data, setData, resetData} = useContext(EditContext) as TProductoContext | any;
    const {minimize, setMinimize} = useFormAnimation(false);
    const [sound, setSound] = useState(JSON.parse(localStorage.getItem('sound') || 'false'));
    const [filtrados, setFiltrados] = useState<TProducto[]>([]);
    const [alerta,setAlerta] = useState(false);
    const [promptAlert,setPromptAlert] = useState(false);
    const [promptDb,setPromptDb] = useState(false);
    const [alertaDetalle, setAlertaDetalle] = useState({});
    const [selectedSuper, setSelectedSuper] = useState<ICompra>();

    const nombre = useRef<HTMLInputElement>(null);
    const listadoSuper = useLiveQuery(
        () => {
            //db.compra.limit(1)
            //.toArray().then((res:any)=>{console.log(res)})
            let compras = db.compra.toArray();
            compras.then((resc)=>{
                if(resc.length > 0){
                    setSelectedSuper(resc[0]);
                    setSuperm(resc[0].super+"")
                }
            })
            return compras;
        }
    );
    const productos = useLiveQuery(
        () => db.productos.toArray().then((pds)=>pds.filter((sup)=>sup.super === selectedSuper?.super))
      ,[selectedSuper]);

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

    const fileSave = async () => {
        let prod = await db.productos.filter(pd=> new RegExp(nombre.current?.value || '', "i").test(pd.nombre)).toArray();
        console.log(prod)
        /*let myData = {title: 'My title',text: 'My text'}
        if (navigator.canShare(myData)) {
            await navigator.share(myData);
        }*/
    }

    const compar = async () => {
        let prod = await db.productos.filter(pd=> new RegExp(nombre.current?.value || '', "i").test(pd.nombre)).toArray();
        console.log(prod)
        /*let myData = {title: 'My title',text: 'My text'}
        if (navigator.canShare(myData)) {
            await navigator.share(myData);
        }*/
    }

    const cargaProducto = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);   let data = Object.fromEntries(formData);
        let fecha = new Date();

        data.total = ((parseFloat(data.precio.toString()) * parseFloat(data.cantidad.toString())) + parseFloat(data.sum_desc.toString()) * (1-parseInt(data.descuento.toString())/100))+"";
        e.currentTarget.reset();

        db.compra.add({//fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDate()
            super: data?.super+"",
            fecha:  fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDate()
        })
        .catch((err:any)=>{
            console.log('Error: producto ya cargado en este supermercado');
        })

        if(data?.id){

            const id = await db.productos.update(data?.id+"",{
                nombre: data?.nombre+"",
                precio: parseFloat(data?.precio+""),
                cantidad: parseInt(data?.cantidad+""),
                descuento: parseFloat(data?.descuento+""),
                sum_desc: parseFloat(data?.sum_desc+""),
                categoria: data?.categoria+"",
                super: data?.super+"",
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

            db.productos.add({
                id: uuid(),
                super: data?.super+"",
                nombre: data?.nombre+"",
                precio: parseFloat(data?.precio+""),
                cantidad: parseInt(data?.cantidad+""),
                descuento: parseFloat(data?.descuento+""),
                sum_desc: parseFloat(data?.sum_desc+""),
                categoria: data?.categoria+"",
                total: parseFloat(data?.total+""),
                chekar:true
            })
            .then(res=>{
                setAlerta(true);
                setAlertaDetalle({color:"#f5f5f5", bgcolor:"#66bb6a", title:"Nuevo Producto",text:"¡Agregado!", status:true});
                setTimeout(() => {
                    setAlerta(false);
                }, 4000);
                if(sound){ beep();}

                db.compra.update(data?.super+"",{
                    total:  parseFloat(data?.precio+"") + productos!.filter((sup)=>sup.super === data?.super)!.reduce((a,o)=>a+o.precio,0),
                    cantidad: productos!.filter((sup)=>sup.super === data?.super).length + 1
                })

            })
            .catch((err:any)=>{
                setAlerta(true);
                setAlertaDetalle({color:"#f5f5f5", bgcolor:"#FF5252", title:"¡Error!",text:"producto ya cargado en este supermercado "+data?.super, status:true});
                setTimeout(() => {
                    setAlerta(false);
                }, 4000);
                resetData();
            })

            

        }
    }
  return (
    <>
    {alerta && <Toast {...alertaDetalle}/>}
    {promptAlert && <Prompt cssClass='text-center' title='¿Borrar compras?' text='Esto borrará todas las compras, no puede deshacerse.' onConfirm={()=>{borrarCompras(); resetData(); setPromptAlert(false);}} onCancel={ ()=>{setPromptAlert(false)} }/>}
    {promptDb && <PromptDouble btn1='Archivo' btn2='Texto' cssClass='text-center' title='Compartir Compra' text='Seleccione el metodo de compartir su compra' 
        onConfirm={()=>{ ShareText(selectedSuper!, ()=>{setPromptDb(!promptDb)}) }} onAlternative={()=>{ ShareFile(selectedSuper!, ()=>{setPromptDb(!promptDb)})  }} onCancel={ ()=>{setPromptDb(false)} }/>}
    <form onSubmit={cargaProducto} style={{borderRadius:'0.5em', border:'1px solid #ffd8ca', position:'relative', zIndex:0}} className='col-4'>
        <div  style={{borderRadius:'0.5em 0.5em 0 0',backgroundColor:'#fdeae3', padding:'0 1rem 1rem 1rem'}}>
            <AccordionParent state={!minimize} cssClass="pt-2">
                <div className='d-flex justify-content-between align-items-center'>                
                    <div className=''>                        
                        <label htmlFor="super">Supermercado: {selectedSuper?.super}</label>
                        <div className="costado">
                            <input type="text" name='super' id='super' placeholder='Super vea' minLength={3} maxLength={30} required defaultValue={selectedSuper?.super || ""}/>
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="listado-super">Supermercados</label>
                        <select className='costado' style={{width:'120px'}} onChange={(e)=>{setSelectedSuper({super:e.target.value}); setSuperm(e.target.value)}}>
                            <optgroup>
                                {listadoSuper?.map((ls,lsi)=>{
                                    return <option key={lsi} value={ls.super}>{ls.super}</option>
                                })}
                            </optgroup>
                        </select>
                    </div>
                </div>
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
            <Upload/>
        </button>
        <button type="button" className='btn text-w m-1 p-1' style={{backgroundColor:'gold', color:'black'}} onClick={()=>{setPromptDb(true)}}>
            <Share/>
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