import { useEffect, useState } from 'react';
import { IRouter } from '../Interfaces';
import { db } from '../DB/db';
import { Prompt, Toast } from '../Components';

export const Configuracion = ({font,setFont, theme, setTheme}:IRouter) => {
  const [sound, setSound] = useState(JSON.parse(localStorage.getItem('sound') || 'false'));
  const [prompt, setPrompt] = useState(false);
  const [alerta, setAlerta] = useState(false)
  const [alertaDetalle, setAlertaDetalle] = useState({});

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
            Toda la configuracion relacionada a la app, en caso de desinstalar la app, todas las configuraciones estarán por defecto.
          </div>
        </section>
        <section>
          <article className='d-flex justify-content-between flex-wrap'>
            <fieldset>
              <legend><label htmlFor="fuente"><b>Tamaño de fuente: </b></label></legend>
              <select name="fuente" id="fuente" onChange={(e) => {
                setFont(e.target.value);
              }} defaultValue={font}>
                <option value="sm">Pequeño</option>
                <option value="md">Normal (defecto)</option>
                <option value="lg">Grande</option>
              </select>
            </fieldset>
            <fieldset>
              <legend><label htmlFor="sonido"><b>Sonido: </b></label></legend>
              <select name="sonido" id="sonido" onChange={(e) => { 
                  setSound(JSON.parse(e.target.value)) 
                }} defaultValue={sound + ''}>
                <option value="true">Habilitado</option>
                <option value="false">Deshabilitado (defecto)</option>
              </select>
            </fieldset>
            <fieldset>
              <legend><label htmlFor="theme"><b>Tema: </b></label></legend>
              <select name="theme" id="theme" onChange={(e) => {
                setTheme(e.target.value);
              }} defaultValue={theme}>
                <option value="light">Claro (defecto)</option>
                <option value="dark">Oscuro</option>
              </select>
            </fieldset>
            <fieldset>
              <legend><label htmlFor="datos"><b>Datos de aplicación: </b></label></legend>
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
