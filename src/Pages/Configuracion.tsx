import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { ICompra, IRouter } from '../Interfaces';
import { db } from '../DB/db';
import { CurrencyForm, Prompt, Toast } from '../Components';
import { v4 as uuid } from 'uuid';
import { Check, Folder, PadlockClosed, PadlockOpen } from '../Components/Icons';
import { Exchange, TFont, TSound } from '../Types';
import { beep } from '../Helpers';
import { ZConfig } from '../Store';

export const Configuracion = () => {
  const {sound, font, theme, exchanges, switchFontSize, switchSound,switchTheme, resetConfig} = ZConfig((state)=>state);
  const [prompt, setPrompt] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [saved, setSaved] = useState(false);
  const [locked, setLocked] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [alertaDetalle, setAlertaDetalle] = useState({});
  const [text, setText] = useState("");
  const form = useRef<FormEvent<HTMLFormElement>>();
  const formF = useRef<any>();


  const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    procesarTexto(text);
    e.currentTarget.reset();
  }

  

  const changeFile = (e:ChangeEvent<HTMLInputElement>) =>{//as HTMLInputElement
    try {
      let files = e.target.files;
      if(files?.length === 1){
        let filname = files[0].name;
        let filedata = files[0];
        if(filname.includes(".txt")){
          let freader = new FileReader();
          freader.onload = (fre)=>{
            procesarTexto(fre.target?.result+"");
            //e.currentTarget.value = null as any;
            formF.current.reset();
          }
          freader.readAsText(filedata);
          freader.onerror = ()=>{
            throw new Error("Error al leer archivo");            
          }
        }else{
          throw new Error("Error de extensión");
        }
      }else{
        throw new Error("Error al leer archivo");
      } 
    } catch (error) {
      setAlerta(true);
      setAlertaDetalle({title:"¡ERROR!", text:'Error al leer el archivo de texto, copie el texto y peguelo arriva', status:true, cssClass:'c-ored text-w text-center'})
      setTimeout(() => {
        setAlerta(false);
      }, 2500);
    }    
  }
  
  const procesarTexto = async (txt:string) =>{
    try {
      let arrTxt = txt.split("\n");
      let dim = arrTxt.length;
      if(dim > 1){
        let compraData = JSON.parse(arrTxt[0]) as ICompra;
        compraData.super = compraData.super+"-imp";
        let productoDataArr = [...arrTxt];
        productoDataArr.shift();
        
        if(compraData.total === undefined || compraData.fecha === undefined || compraData.super === undefined || compraData.cantidad === undefined){
          throw new Error("Objeto {compra} incorrecto");
        }        
        if( (compraData.cantidad === 0 || compraData.total === 0) || (isNaN(compraData.cantidad) || isNaN(compraData.total)) ){
          throw new Error("Objeto {compra} incorrecto");
        }
        if(!isNaN(compraData.super as any)){
          throw new Error("Objeto {compra} incorrecto");
        }
        
        if(Object.keys(compraData).length > 1){
          if(productoDataArr.length > 0){
            let bulkDataArr = [];
            let idc = await db.compra.add(compraData);
            if(idc){//true
              for(let i = 0; i<productoDataArr.length;i++){
                let txtProd = productoDataArr[i].split("=");
                let pId = uuid();
                txtProd[1] = parseFloat(txtProd[1]) as any;
                if(isNaN(txtProd[1] as any)){
                  db.compra.delete(compraData.super);
                  throw new Error("Formato incorrecto de precio producto o el supermercado importado es repetido");
                }
                let pObj = {id: pId, nombre: txtProd[0],
                            precio: txtProd[1], cantidad: 1,descuento: 0,
                            sum_desc: 0,categoria: '', total:txtProd[1],
                            chekar:true, super: compraData.super}
                bulkDataArr.push(pObj);
              }
              let idp = await db.productos.bulkAdd(bulkDataArr as any);
              if(idp){
                setLocked(true)
                setText("");
                setAlerta(true);
                setAlertaDetalle({title:"¡Importado!", text:'Compras y productos importados con éxito', status:true, cssClass:'c-green text-w text-center'})
                setTimeout(() => {
                  setAlerta(false);
                }, 2500);
              }
            }
          }else{
            throw new Error("Sin productos");
          }
        }else{
          throw new Error("Objeto {compra} incorrecto");
        }
      }else{
        throw new Error("formato incorrecto");
      }
    } catch (error: any) {
      setAlerta(true);
      setAlertaDetalle({title:"¡ERROR!", text:'Formato incorrecto o el supermercado es repetido', status:true, cssClass:'c-ored text-w text-center'})
      setTimeout(() => {
        setAlerta(false);
      }, 2500);
    }    
  }

  const borrarDatos = async () => {
    try {
      localStorage.removeItem('calculadora');
      localStorage.removeItem('exchanges');
      db.compra.clear();
      db.productos.clear();
      setPrompt(false);
      //setExchanges([]);
    } catch (error) {
      setAlerta(true);
      setAlertaDetalle({title:"¡Error al borrar datos!",text:"Borre los datos de la aplicación desde la configuración de su dispositivo", status:true, cssClass:'c-ored text-w text-center'});
      setTimeout(() => {
        setAlerta(false);
      }, 2500);
    }
  }

  return (
    <>
      {alerta && <Toast {...alertaDetalle}/>}
      {prompt && <Prompt cssClass='text-center' title='¿Borrar datos?' text='Esto borrará todas las compras y productos, no puede deshacerse.' 
        onConfirm={ ()=>{
          resetConfig();
          //borrarDatos();
          setAlerta(true);
          setAlertaDetalle({title:"Datos Borrados",text:"Solo compras y productos, las configuraciones no se borran", status:true, cssClass:'c-green text-w text-center'});
          setTimeout(() => {
            setAlerta(false);
          }, 2500);
        } } onCancel={() => { setPrompt(false) }} />}
      <div className='menu-header'>Configuración</div>
      <div className='pop-up mt-4'>
        <section>
            Toda la configuración relacionada a la app, en caso de desinstalar la app, todas las configuraciones estarán por defecto.
        </section>
        <section>
          <article className='d-flex justify-content-between flex-wrap gap-1'>
            <fieldset>
              <legend className='px-05'><label htmlFor="fuente"><b>TAMAÑO DE FUENTE:</b></label></legend>
              <select name="fuente" id="fuente" onChange={(e) => {
                switchFontSize(e.target.value as TFont);
              }} value={font}>
                <option value="sm">Pequeño</option>
                <option value="md">Normal (defecto)</option>
                <option value="lg">Grande</option>
              </select>
            </fieldset>
            <fieldset>
              <legend className='px-05'><label htmlFor="sonido"><b>SONIDO: </b></label></legend>
              <select name="sonido" id="sonido" onChange={(e) => { 
                  e.target.value === 'true' && beep();
                  switchSound(); 
                }} value={sound}>
                <option value="true">Habilitado</option>
                <option value="false">Deshabilitado (defecto)</option>
              </select>
            </fieldset>
            <fieldset>
              <legend className='px-05'><label htmlFor="theme"><b>TEMA: </b></label></legend>
              <select name="theme" id="theme" onChange={(e) => {
                switchTheme();
              }} value={theme}>
                <option value="light">Claro (defecto)</option>
                <option value="dark">Oscuro</option>
              </select>
            </fieldset>
            <fieldset>
              <legend className='px-05'><label htmlFor="datos"><b>TIPO DE CAMBIO: </b></label></legend>
              <div className='mb-2'>
                <small><i>Una unidad de tipo de cambio "A" vale X de cambio "B", por ejemplo: 1 USD (destino) en ARS (origen) es: $1020</i></small>
              </div>
              <label>Tipos de cambio guardados: </label>
              <div className='d-flex align-items-center'>
                <div className={saved ? 'text-g' : 'd-none'}>
                  <Check/>
                </div>
                <select>
                  {exchanges.map((em,emi)=><option key={emi} value={em.value}>{em.exchange+" ("+em.ucode+(em.value.toFixed(2))+")"}</option>)}
                </select>              
              </div>
              <CurrencyForm setSaved={setSaved}/>
            </fieldset>
            <fieldset>
              <legend className='px-05'><label htmlFor="datos"><b>IMPORTAR DESDE TEXTO: </b></label></legend>
              <small><i>Pegue el texto que le compartieron, la aplicación se encargara de sincronizar los datos </i></small>
              <button className='btn p-05 c-seorange' onClick={()=>{setLocked(!locked)}}>{locked ? <PadlockClosed/> : <PadlockOpen/>}</button>
              {locked && clicked ? <small className='text-r'><i> Desbloqueé la entrada manual </i></small> : <></>}
              <form ref={form as any} onSubmit={handleSubmit} className='d-flex justify-content-center mt-1 flex-wrap gap-1'>
                  <textarea name="text" id="text" rows={5} defaultValue={text} 
                    onChange={(e)=>{setText(e.currentTarget.value)}} readOnly={locked}
                    onClick={()=>{setClicked(true)}}
                    >
                  </textarea>
                  <button className='btn p-1 c-oblue' type='button'
                  onClick={async ()=>{
                    try {
                      let pasText = await navigator.clipboard.readText();
                      setText(pasText);
                      setLocked(true);
                    } catch (error) {
                      setAlerta(true);
                      setAlertaDetalle({title:"Error al pegar texto",text:"Peguelo manualmente o verifique los permisos", status:true, cssClass:'c-ored text-w text-center'});
                      setTimeout(() => {
                        setAlerta(false);
                      }, 2500);
                    }
                  }}
                  >Pegar</button>
                  <button type='submit' className={`btn p-1 ${text.length === 0 ? 'c-lgreen' : 'c-green'}`} 
                  disabled={text.length === 0 ? true : false}
                  onClick={()=>{}}
                  >Cargar</button>
              </form>
            </fieldset>
            <fieldset>
              <legend className='px-05'><label htmlFor="datos"><b>IMPORTAR DESDE ARCHIVO .TXT: </b></label></legend>
              <small><i>Seleccione el archivo que tenga descargado en su dispositivo</i></small>
              <form ref={formF as any} onSubmit={(e)=>{e.preventDefault()}} className='d-flex justify-content-center mt-1'>
                  <label htmlFor="archivo" className='btn c-oblue p-1'>Buscar Archivo &nbsp; <Folder/></label>
                  <input type="file" name="archivo" id="archivo" accept='.txt' className='d-none' onChange={changeFile}/>
              </form>
            </fieldset>
            <fieldset className='mb-3'>
              <legend className='px-05'><label htmlFor="datos"><b>DATOS DE APLICACIÓN: </b></label></legend>
              <div className='d-flex justify-content-center'>
                <button className='btn p-1 c-ored' onClick={() => { setPrompt(true) }}>Borrar Datos</button>
              </div>
            </fieldset>
          </article>
        </section>
      </div>
    </>
  )
}
