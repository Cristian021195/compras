import { ChangeEvent, FormEvent, LegacyRef, RefObject, useEffect, useRef, useState } from 'react';
import { ICompra, IProducto, IRouter } from '../Interfaces';
import { db } from '../DB/db';
import { Prompt, Toast } from '../Components';
import { v4 as uuid } from 'uuid';
import { Folder } from '../Components/Icons';

export const Configuracion = ({font,setFont, theme, setTheme}:IRouter) => {
  const [sound, setSound] = useState(JSON.parse(localStorage.getItem('sound') || 'false'));
  const [prompt, setPrompt] = useState(false);
  const [alerta, setAlerta] = useState(false)
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
                  throw new Error("Formato incorrecto de precio producto");                  
                }
                let pObj = {id: pId, nombre: txtProd[0],
                            precio: txtProd[1], cantidad: 1,descuento: 0,
                            sum_desc: 0,categoria: '', total:txtProd[1],
                            chekar:true, super: compraData.super}
                bulkDataArr.push(pObj);
              }
              let idp = await db.productos.bulkAdd(bulkDataArr as any);
              if(idp){
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
    } catch (error) {
      setAlerta(true);
      setAlertaDetalle({title:"¡ERROR!", text:'Formato de texto incorrecto', status:true, cssClass:'c-ored text-w text-center'})
      setTimeout(() => {
        setAlerta(false);
      }, 2500);
    }    
  }

  const borrarDatos = async () => {
    try {
      localStorage.removeItem('calculadora');
      db.compra.clear();
      db.productos.clear();
      setPrompt(false);
    } catch (error) {
      console.log("Error");
    }
  }

  useEffect(()=>{
    localStorage.setItem('sound', sound+'');
  },[sound])
  useEffect(()=>{
    localStorage.setItem('theme', theme+'');
  },[theme])
  useEffect(()=>{    
    document.body.classList.add('font-'+font);
  },[])

  return (
    <>
      {alerta && <Toast {...alertaDetalle}/>}
      {prompt && <Prompt cssClass='text-center' title='¿Borrar datos?' text='Esto borrará todas las compras y productos, no puede deshacerse.' 
        onConfirm={ ()=>{
          borrarDatos();
          setAlerta(true);
          setAlertaDetalle({title:"Datos Borrados",text:"Solo compras y productos, las configuraciones no se borran", status:true, cssClass:'c-green text-w text-center'});
          setTimeout(() => {
            setAlerta(false);
          }, 2500);
        } } onCancel={() => { setPrompt(false) }} />}
      <div className='pop-up'>
        <section id='detector'>
          <h1 className='text-center'>Configuración</h1>
          <div className='col-6 m-1'>
            Toda la configuración relacionada a la app, en caso de desinstalar la app, todas las configuraciones estarán por defecto.
          </div>
        </section>
        <section>
          <article className='d-flex justify-content-between flex-wrap gap-1'>
            <fieldset>
              <legend className='px-05'><label htmlFor="fuente"><b>TAMAÑO DE FUENTE:</b></label></legend>
              <select name="fuente" id="fuente" onChange={(e) => {
                setFont(e.target.value);
              }} defaultValue={font}>
                <option value="sm">Pequeño</option>
                <option value="md">Normal (defecto)</option>
                <option value="lg">Grande</option>
              </select>
            </fieldset>
            <fieldset>
              <legend className='px-05'><label htmlFor="sonido"><b>SONIDO: </b></label></legend>
              <select name="sonido" id="sonido" onChange={(e) => { 
                  setSound(JSON.parse(e.target.value)) 
                }} defaultValue={sound + ''}>
                <option value="true">Habilitado</option>
                <option value="false">Deshabilitado (defecto)</option>
              </select>
            </fieldset>
            <fieldset>
              <legend className='px-05'><label htmlFor="theme"><b>TEMA: </b></label></legend>
              <select name="theme" id="theme" onChange={(e) => {
                setTheme(e.target.value);
              }} defaultValue={theme}>
                <option value="light">Claro (defecto)</option>
                <option value="dark">Oscuro</option>
              </select>
            </fieldset>
            <fieldset>
              <legend className='px-05'><label htmlFor="datos"><b>IMPORTAR DESDE TEXTO: </b></label></legend>
              <small><i>Pegue el texto que le compartieron, la aplicación se encargara de sincronizar los datos</i></small>
              <form ref={form as any} onSubmit={handleSubmit}>
                <div className='d-flex justify-content-center mt-1'>
                  <textarea name="text" id="text" defaultValue={text} onChange={(e)=>{setText(e.currentTarget.value)}}></textarea>
                </div>
                <div className='d-flex justify-content-center mt-1'>
                  <button className={`btn p-1 ${text.length === 0 ? 'c-lgreen' : 'c-green'}`} 
                  disabled={text.length === 0 ? true : false}
                  onClick={()=>{}}
                  >Cargar</button>
                </div>
              </form>
            </fieldset>
            <fieldset>
              <legend className='px-05'><label htmlFor="datos"><b>IMPORTAR DESDE ARCHIVO .TXT: </b></label></legend>
              <small><i>Seleccione el archivo que tenga descargado en su dispositivo</i></small>
              <form ref={formF as any} onSubmit={(e)=>{e.preventDefault()}}>
                <div className='d-flex justify-content-center mt-1'>
                  <label htmlFor="archivo" className='btn c-oblue p-1'>Buscar Archivo &nbsp; <Folder/></label>
                  <input type="file" name="archivo" id="archivo" accept='.txt' className='d-none' onChange={changeFile}/>
                </div>
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
