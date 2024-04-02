import { useContext, useEffect, useRef, useState } from 'react'
import { useFormAnimation } from '../../Hooks';
import {FormEvent} from 'react'
import { db } from '../../DB/db';
import {v4 as uuid} from "uuid";
import { EditContext } from '../../Context/EditContext';
import { TProductoContext, TProducto,ICompra } from '../../Interfaces/';
import { ShareFile, ShareText, beep } from '../../Helpers';
import { Add, Clean, Search, Share, Trash, ShoppingCart, Triangle, PadlockClosed, PadlockOpen} from '../Icons';
import { AccordionParent } from '../UI/AccordeonParent';
import { Prompt, PromptExchangeOpts, Toast } from '../UI';
import { useLiveQuery } from 'dexie-react-hooks';
import { Exchange } from '../../Types';
const borrarCompras = async (val:string|undefined) => {
    try {
        if(val){
            db.compra.where("super").equals(val).delete();
            db.productos.where("super").equals(val).delete();
        }else{
            console.log('Error a manejar')
        }
        
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
    const [exch, setExch] = useState(1);
    const [filtrados, setFiltrados] = useState<TProducto[]>([]);
    const [promptAlert,setPromptAlert] = useState(false);
    const [promptDb,setPromptDb] = useState(false);
    const [alerta,setAlerta] = useState(false);
    const [alertaDetalle, setAlertaDetalle] = useState({});
    const [selectedSuper, setSelectedSuper] = useState<ICompra>();
    const [findError, setFindError] = useState(false);
    const [locked, setLocked] = useState(false);
    const superRef = useRef<HTMLInputElement>(null);

    const nombre = useRef<HTMLInputElement>(null);
    const listadoSuper = useLiveQuery(
        () => {
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
    const cbsErr = () =>{
        setAlerta(true);
        setAlertaDetalle({title:"¡Error!",text:"Su dispositivo no soportar Share API", status:true, cssClass:"c-ored text-w text-center"});
        setTimeout(() => {
            setAlerta(false);
        }, 2500);
      }
    const productos = useLiveQuery(
        () => { 
            selectedSuper?.super !== undefined && setLocked(true);
            return db.productos.toArray().then((pds)=>pds.filter((sup)=>sup.super === selectedSuper?.super))
        }
      ,[selectedSuper]);

    const limpiar = () => { 
        resetData();
        setFiltrados([]); 
    }

    const buscar = async()=>{
        if(nombre.current?.value.length! > 0){
            let prod = await db.productos.filter(pd=> new RegExp(nombre.current?.value || '', "i").test(pd.nombre)).toArray();
            prod.length === 0 ? setFindError(true) : setFindError(false);
            setFiltrados(prod.filter(e=>e.super == selectedSuper?.super));
        }else{
            nombre.current?.focus();
            setFindError(true);
        }
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

                db.compra.update(data?.super+"",{
                    //total:  productos!.filter((sup)=>sup.super === data?.super)!.reduce((a,o)=>a+o.precio,0),
                    total:  productos!.filter((sup)=>sup.super === data?.super)!.reduce((a,o)=>{
                        if(data?.id === o.id){
                            return a+ parseFloat(data?.precio+"")
                        }
                        return a+o.precio;
                    },0),
                    cantidad: productos!.filter((sup)=>sup.super === data?.super).length
                })

                setAlerta(true);
                setAlertaDetalle({title:"Edicion",text:"¡Editado!", status:true, cssClass:'c-green text-w text-center'});
                setTimeout(() => {
                    setAlerta(false);
                }, 4000);
                if(sound){ beep(); }
            }
            setLocked(true);
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
                setAlertaDetalle({title:"Nuevo Producto",text:"¡Agregado!", status:true, cssClass:'c-green text-w text-center'});
                setTimeout(() => {
                    setAlerta(false);
                }, 4000);
                if(sound){ beep();}

                db.compra.update(data?.super+"",{
                    total:  parseFloat(data?.precio+"") + productos!.filter((sup)=>sup.super === data?.super)!.reduce((a,o)=>a+o.precio,0),
                    cantidad: productos!.filter((sup)=>sup.super === data?.super).length + 1
                })
                setLocked(true);
                limpiar();

            })
            .catch((err:any)=>{
                setAlerta(true);
                setAlertaDetalle({title:"¡Advertencia!",text:"producto ya cargado en este supermercado "+data?.super, status:true, cssClass:'c-gold text-center'});
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
    {promptAlert && <Prompt cssClass='text-center' title='¿Borrar compras?' text='Esto borrará todas las compras, no puede deshacerse.' 
        onConfirm={()=>{borrarCompras(selectedSuper?.super); setFiltrados([]); resetData(); setPromptAlert(false);}} onCancel={ ()=>{setPromptAlert(false)} }/>}
    {promptDb && <PromptExchangeOpts exch={exch} setExch={setExch} btn1='Archivo' btn2='Texto' cssClass='text-center' title='Compartir Compra' text='Seleccione el metodo de compartir su compra' 
        onConfirm={()=>{ 
            if(selectedSuper?.super !== undefined){
                ShareText(selectedSuper!, exch, ()=>{setPromptDb(!promptDb)}, cbsErr)
            }else{
                setAlerta(true);
                setAlertaDetalle({title:"¡Error!",text:"No hay datos para exportar", status:true, cssClass:"c-ored text-w text-center"});
                setTimeout(() => {
                    setAlerta(false);
                }, 2500);
            }
        }}
        onAlternative={()=>{
            if(selectedSuper?.super !== undefined){
                ShareFile(selectedSuper!, exch, ()=>{setPromptDb(!promptDb)}, cbsErr)
            }else{
                setAlerta(true);
                setAlertaDetalle({title:"¡Error!",text:"No hay datos para exportar", status:true, cssClass:"c-ored text-w text-center"});
                setTimeout(() => {
                    setAlerta(false);
                }, 2500);
            }
            
        }}
        onCancel={ ()=>{setPromptDb(false)} }/>}
    <form onSubmit={cargaProducto} className='producto-form c-lforange mw-100'>
        <div className='ps-2 pe-2 rounded-top'>
            <AccordionParent state={!minimize} cssClass="pt-2">
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <div>                        
                        <label htmlFor="super">Supermercado: </label>
                        <div className="costado-esp">
                            <input type="text" name='super' ref={superRef} id='super' placeholder='Super vea' minLength={3} maxLength={30} required defaultValue={selectedSuper?.super || ""} readOnly={locked}/>
                            <button type='button' className='btn c-lblue px-010 py-025' tabIndex={-1} 
                                onClick={()=>{
                                    setLocked(!locked);
                                    locked === true && superRef.current?.focus();
                                }}>
                                {locked ? <PadlockClosed/> : <PadlockOpen/>}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="listado-super">Supermercados</label>
                        <div className='costado'>
                            <select className='costado' style={{width:'120px'}} tabIndex={-1} onChange={(e)=>{setSelectedSuper({super:e.target.value}); setSuperm(e.target.value)}}>
                                {listadoSuper?.map((ls,lsi)=>{
                                    return <option key={lsi} value={ls.super}>{ls.super}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <div>
                        <label htmlFor="nombre">Producto <span><ShoppingCart/> <Search style={{verticalAlign:'bottom', paddingBottom: 2}}/></span>:<span>{findError ? '❌' : ''}</span></label>                        
                        <div className="costado"><input type="text" ref={nombre} name='nombre' id='nombre' placeholder='Galletas x250' minLength={3} maxLength={30} required defaultValue={data?.nombre}/></div>
                    </div>
                    <div>
                        <label htmlFor="precio">Precio <b>($)</b>:</label>                        
                        <div className="costado">
                            <input type="number" name="precio" min={0} max={1000000} step='0.01' required value={data?.precio} 
                            onChange={(e)=>{setData({...data, precio: e.target.value })}}/>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center mb-2'>                    
                    <div>
                        <label htmlFor="cantidad">Cantidad <b>(¾)</b>:</label>
                        <div className="costado">
                            <input type="number" name="cantidad" min={1} max={1000000} required value={data?.cantidad} 
                            onChange={(e)=>{setData({...data, cantidad: e.target.value })}}/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="sum_desc">suma/desc <b>(±) </b>: </label>
                        <div className="costado">
                            <input type="number" name="sum_desc" min={-999999} max={1000000} step='0.01' required value={data?.sum_desc} 
                            onChange={(e)=>{setData({...data, sum_desc: e.target.value })}}/>
                        </div>
                    </div>
                </div>
                <label htmlFor="descuento" className='d-none align-items-center justify-content-between flex-wrap p-1'>Descuento (%): <input type="number" name="descuento" min={0} required value={data?.descuento} onChange={(e)=>{setData({...data, descuento: parseFloat(e.target.value)})}}/>
                </label>
                <input type="hidden" name="id" defaultValue={data?.id}/>
                <input type="hidden" name="categoria" value="cualquiera"/>
            </AccordionParent>
        </div>
        <div className='d-flex justify-content-evenly align-items-center align-items-center pb-2'>
            <button type="submit" className='btn btn-circle text-w c-green circle p-1'>
                <Add width={14} height={14}/>
            </button>
            <button type="reset" className='btn btn-circle text-w c-dgreen circle p-1' onClick={limpiar}>
                <Clean width={14} height={14}/>
            </button>
            <button type="button" className='btn btn-circle text-w c-ored circle p-1' onClick={()=>{
                setPromptAlert(true);
            }}>
                <Trash width={14} height={14}/>
            </button>
            <button type="button" className='btn btn-circle text-w c-oblue circle p-1' onClick={buscar}>
                <Search width={14} height={14}/>
            </button>
            <button type="button" className='btn btn-circle text-w c-lblue circle p-1' onClick={()=>{setPromptDb(true)}}>
                <Share/>
            </button>
            <button type='button' className={minimize ? 'btn btn-circle rotate-right c-main circle p-1' : 'btn btn-circle rotate-left c-main circle p-1'}
            onClick={()=>setMinimize(!minimize)}><Triangle/></button>
        </div>        
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