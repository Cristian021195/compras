import React, { useEffect, useState } from 'react'
import { useSlideRouter } from '../Hooks';
import { IRouter } from '../Interfaces';

export const Inicio = ({runner, setRunner, font,setFont}:IRouter) => {
  const {pos1, pos2, setPos1, setPos2} = useSlideRouter(window.location.pathname, runner, setRunner);
  const [bip, setBip] = useState<any>(undefined);
  const [sound, setSound] = useState(JSON.parse(localStorage.getItem('sound') || 'false'));

  useEffect(()=>{
    localStorage.setItem('sound', sound+'');
  },[sound])
  useEffect(()=>{
        window.addEventListener('beforeinstallprompt', (event) => {
            setBip(event)
        });
        document.body.classList.add('font-'+font);
  },[])
  return (
    <section style={{textAlign:'center'}} className='pop-up' id='detector'>
        <h1>Inicio</h1>
        <div style={{textAlign:'start', margin:'2em auto'}} className='col-6'>
          <p><b>ListaCompras</b>, es una aplicación simple, creada para mis prácticas en Desarrollo Web.</p>
          <p>La app es surge al momento de tener que hacer compras en el supermercado, e ir cargando lo que necesitemos, asi tener mayor control de que compramos.</p>
          <small><i>*Para tener siempre la ultima version, puede ser necesario <a href="/">recargar</a> la web app</i></small>
          <br />
          <article className='d-flex justify-content-center'>
            <fieldset className='d-flex align-items-center justify-content-center'>
              <legend><label htmlFor="fuente"><b>Tamaño de fuente: </b></label></legend>
              <select name="fuente" id="fuente" onChange={(e)=>{
                setFont(e.target.value);
                }} defaultValue={font}>
                <option value="sm">Pequeño</option>
                <option value="md">Normal</option>
                <option value="lg">Grande</option>
              </select>
            </fieldset>
            <fieldset className='d-flex align-items-center justify-content-center'>
              <legend><label htmlFor="sonido"><b>Sonido: </b></label></legend>
              <select name="sonido" id="sonido" onChange={(e)=>{ setSound(JSON.parse(e.target.value)) }} defaultValue={sound+''}>
                <option value="true">Habilitado</option>
                <option value="false">Deshabilitado</option>
              </select>
            </fieldset>
          </article>
          
          <h3>RECURSOS USADOS</h3>
          <p>La aplicación usa las siguientes librerias y tecnologias:</p>
          <ul className='recursos' style={{width:'12em', margin:'0 auto'}}>
            <li>React JS</li>
            <li>TypeScript</li>
            <li>Vite</li>
            <li>Vite PWA</li>
            <li>React Router DOM</li>
            <li>uuid v4</li>
            <li>Dexie JS</li>
            <li>dexie-react-hooks</li>
          </ul>
          <div>
            
          {bip !== undefined ? <button
                  onClick={async ()=>{
                      if(bip) bip.prompt();
                      const biip = await bip?.userChoice;
                      if (biip?.outcome){
                          if (biip?.outcome === 'accepted') {setBip(null)}
                      }
                  }}
                className='btn p-1 m-2' style={{backgroundColor:'coral', color:'whitesmoke'}}>Instalar</button> : <></> }
          </div>
        </div>
    </section>
  )
}
// <a className='btn p-1 m-2' style={{backgroundColor:'coral', color:'whitesmoke'}} href='/'>Actualizar</a>