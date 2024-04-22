import { useRef, useState } from 'react'
import {FormEvent} from 'react'
import { db } from '../../DB/db';
import {v4 as uuid} from "uuid";
import { TProducto } from '../../Interfaces/';
import { ShareFile, ShareText, beep } from '../../Helpers';
import { Add, Clean, Search, Share, Trash, ShoppingCart, Triangle, PadlockClosed, PadlockOpen} from '../Icons';
import { AccordionParent } from '../UI/AccordeonParent';
import { Prompt, PromptExchangeOpts, Toast } from '../UI';
import { useLiveQuery } from 'dexie-react-hooks';
import { ZConfig, ZMainForm } from '../../Store';
const borrarCompras = async (val:string|undefined, cbs: (v:string)=>void) => {
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


export const ProductoNuevoForm = () => {
    const {selected_super, changeSelectedSuper, super_name, changeSuper, selected_prod, setSelectedProd} = ZMainForm((state)=>state);
    const {sound} = ZConfig((state)=>state);
    const [minimize, setMinimize] = useState(false);
    const [filtrados, setFiltrados] = useState<TProducto[]>([]);
    const [locked, setLocked] = useState(false);
    const [exch, setExch] = useState(1);
    const [curr, setCurr] = useState('');
    const [promptAlert,setPromptAlert] = useState(false);
    const [promptDb,setPromptDb] = useState(false);
    const [alerta,setAlerta] = useState(false);
    const [findError, setFindError] = useState(false);
    const [alertaDetalle, setAlertaDetalle] = useState({});
    const nombre = useRef<HTMLInputElement>(null);
    const listado = useLiveQuery(
        async () => {
            let productos = await db.productos.toArray();
            return {productos};
        },
        []
    );
    const listadoc = useLiveQuery(
        async () => {
            let compras = await db.compra.toArray();
            if(compras.length > 0 && selected_super === ''){
                changeSelectedSuper(compras[0].super+"")
            }
            return {compras};
        },
        [selected_super]
    );
    const cbsErr = () =>{
        setAlerta(true);
        setAlertaDetalle({title:"¡Error!",text:"Su dispositivo no soportar Share API", status:true, cssClass:"c-ored text-w text-center"});
        setTimeout(() => {
            setAlerta(false);
        }, 2500);
    }
    const buscar = async()=>{
        if(nombre.current?.value.length! > 0){
            let prod = await db.productos.filter(pd=> new RegExp(nombre.current?.value || '', "i").test(pd.nombre)).toArray();
            prod.length === 0 ? setFindError(true) : setFindError(false);
            setFiltrados(prod.filter(e=>e.super == selected_super));
        }else{
            setFindError(true);
            setFiltrados([]);
        }
    }
    const cargaProducto = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);   let data = Object.fromEntries(formData);
        let fecha = new Date();

        data.total = ((parseFloat(data.precio+"") * parseFloat(data.cantidad+"")) + parseFloat(data.sum_desc+"") * (1-parseInt(data.sum_desc+"")/100))+"";

        db.compra.add({
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
                    total:  listado!.productos?.filter((sup)=>sup.super === data?.super)!.reduce((a,o)=>{
                        if(data?.id === o.id){
                            return a+ parseFloat(data?.precio+"")
                        }
                        return a+o.precio;
                    },0),
                    cantidad: listado!.productos?.filter((sup)=>sup.super === data?.super).length
                })
                if(sound == 'true'){ beep(); }
            }
            setLocked(true);
            cleanProd();
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
                if(sound == 'true'){ beep();}

                db.compra.update(data?.super+"",{
                    total:  parseFloat(data?.precio+"") + listado!.productos?.filter((sup)=>sup.super === data?.super)!.reduce((a,o)=>a+o.precio,0),
                    cantidad: listado!.productos?.filter((sup)=>sup.super === data?.super).length + 1
                })
                setLocked(true);
                cleanProd();
            })
            .catch((err:any)=>{
                setAlerta(true);
                setAlertaDetalle({title:"¡Advertencia!",text:"producto ya cargado en este supermercado "+data?.super, status:true, cssClass:'c-gold text-center'});
                setTimeout(() => {
                    setAlerta(false);
                }, 4000);                
            })
        }
    }
    const cleanProd = ()=>{
        setSelectedProd({...selected_prod!,id:'',precio:1,cantidad:1,nombre:''})
    }
    return (
        <>
        {alerta && <Toast {...alertaDetalle}/>}
        {promptAlert && <Prompt cssClass='text-center' title='¿Borrar compras?' text='Esto borrará todas las compras, no puede deshacerse.' 
            onConfirm={()=>{borrarCompras(selected_super, changeSuper); setFiltrados([]); setPromptAlert(false);}} onCancel={ ()=>{setPromptAlert(false)} }/>}
        {promptDb && <PromptExchangeOpts exch={exch} curr='' setCurr={setCurr} setExch={setExch} btn1='Archivo' btn2='Texto' cssClass='text-center' title='Compartir Compra' text='Seleccione el metodo de compartir su compra' 
            onConfirm={()=>{ 
                if(selected_super !== undefined){
                    ShareText(selected_super, exch, curr, ()=>{setPromptDb(!promptDb)}, cbsErr)
                }else{
                    setAlerta(true);
                    setAlertaDetalle({title:"¡Error!",text:"No hay datos para exportar", status:true, cssClass:"c-ored text-w text-center"});
                    setTimeout(() => {
                        setAlerta(false);
                    }, 2500);
                }
            }}
            onAlternative={()=>{
                if(selected_super !== undefined){
                    ShareFile(selected_super!, exch, curr, ()=>{setPromptDb(!promptDb)}, cbsErr)
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
                                    <input type="text" name='super' id='super' placeholder='Super vea' minLength={3} maxLength={30} readOnly={locked}
                                    required value={super_name === '' ? selected_super: super_name} onChange={(e)=>{
                                        changeSuper(e.target.value);
                                    }}/>
                                    <button type='button' className='btn c-lblue px-010 py-025' tabIndex={-1} 
                                        onClick={()=>{
                                            setLocked(!locked);
                                        }}>
                                        {locked ? <PadlockClosed/> : <PadlockOpen/>}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="listado-super">Supermercados</label>
                                <div className='costado'>
                                    <select className='costado' style={{width:'120px'}} tabIndex={-1} value={super_name}
                                        onChange={(e)=>{
                                            changeSelectedSuper(e.target.value);
                                            changeSuper(e.target.value);
                                            cleanProd();
                                        }}>
                                        {listadoc?.compras?.map((ls,lsi)=>{
                                            return <option key={lsi} value={ls.super}>{ls.super}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <div>
                                <label htmlFor="nombre">Producto 
                                    <span><ShoppingCart /><Search style={{ verticalAlign: 'bottom', paddingBottom: 2 }} /></span>:{findError ? '❌' : ''}<span></span>
                                </label>
                                <div className="costado">
                                    <input type="text" name='nombre' id='nombre' ref={nombre} placeholder='Galletas x250' minLength={3} maxLength={30} required value={selected_prod?.nombre || ''}
                                    onChange={(e)=>{setSelectedProd({...selected_prod!, nombre:e.target.value,id:''})}}/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="precio">Precio <b>($)</b>:</label>                        
                                <div className="costado">
                                    <input type="number" name="precio" min={0} max={1000000} step='0.01' required onChange={(e)=>{
                                            setSelectedProd({...selected_prod!, precio:parseFloat(e.target.value)})
                                        }} value={selected_prod?.precio} defaultValue={1}/>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mb-2'>                    
                            <div>
                                <label htmlFor="cantidad">Cantidad <b>(¾)</b>:</label>
                                <div className="costado">
                                    <input type="number" name="cantidad" min={1} max={1000000} required onChange={(e)=>{
                                        setSelectedProd({...selected_prod!, cantidad:parseFloat(e.target.value)})
                                    }} defaultValue={1} value={selected_prod?.cantidad}/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="sum_desc">suma/desc <b>(±) </b>: </label>
                                <div className="costado">
                                    <input type="number" name="sum_desc" min={-999999} max={1000000} step='0.01' onChange={(e)=>{
                                        setSelectedProd({...selected_prod!, sum_desc:parseFloat(e.target.value)})
                                    }} defaultValue={0} value={selected_prod?.sum_desc}/>
                                </div>
                            </div>
                        </div>
                        <label htmlFor="descuento" className='d-none align-items-center justify-content-between flex-wrap p-1'>Descuento (%): 
                        <input type="number" name="descuento" min={0} onChange={(e)=>{}}/>
                        </label>
                        <input type="hidden" name="id" defaultValue={selected_prod?.id}/>
                        <input type="hidden" name="categoria" value="cualquiera"/>
                    </AccordionParent>
                </div>
                <div className='d-flex justify-content-evenly align-items-center align-items-center pb-2'>
                    <button type="submit" className='btn btn-circle text-w c-green circle p-1'>
                        <Add width={14} height={14}/>
                    </button>
                    <button type='button' className='btn btn-circle text-w c-dgreen circle p-1' onClick={cleanProd}>
                        <Clean width={14} height={14}/>
                    </button>
                    <button type="button" className='btn btn-circle text-w c-ored circle p-1' onClick={()=>{setPromptAlert(true);}}>
                        <Trash width={14} height={14}/>
                    </button>
                    <button type="button" className='btn btn-circle text-w c-oblue circle p-1' onClick={buscar}>
                        <Search width={14} height={14}/>
                    </button>
                    <button type="button" className='btn btn-circle text-w c-lblue circle p-1' onClick={()=>{setPromptDb(true)}}>
                        <Share/>
                    </button>
                    <button type='button' className={minimize ? 'btn btn-circle rotate-right c-main circle p-1' : 'btn btn-circle rotate-left c-main circle p-1'}
                    onClick={()=>{setMinimize(!minimize)}}><Triangle/></button>
                </div>        
                <div className='d-flex justify-content-center'>
                        {
                        filtrados.length > 0 && <fieldset className='pop-up mb-2'>
                        <legend><small>Resultados: </small></legend>
                        <p className='m-0'>
                            {
                                filtrados.map((fil,fili)=><small key={fili}>{fil.nombre} ${fil.precio} &emsp; </small>)
                            }
                        </p>
                    </fieldset>
                    }
                </div>
            </form>
        </>
    )
}