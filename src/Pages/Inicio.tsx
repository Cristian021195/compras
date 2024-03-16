import React, { useEffect, useState } from 'react'
import { useSlideRouter } from '../Hooks';
import { IRouter } from '../Interfaces';
import { Prompt, Toast } from '../Components';
import QRCode from 'react-qr-code';

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
        <h1>Información y Contacto</h1>
        <div style={{textAlign:'start'}} className='col-6 scroll-y'>
          <p><b>ListaCompras</b>, es una aplicación simple, creada para mis prácticas en el Desarrollo Web.</p>
          <p>La app es surge al momento de tener que hacer compras en el supermercado, e ir cargando lo que necesitemos, asi tener mayor control de que compramos.</p>
          <div style={{textAlign:'center'}}>{bip !== undefined ? <button
                  onClick={async ()=>{
                      if(bip) bip.prompt();
                      const biip = await bip?.userChoice;
                      if (biip?.outcome){
                          if (biip?.outcome === 'accepted') {setBip(null)}
                      }
                  }}
                className='btn p-1 m-2' style={{backgroundColor:'coral', color:'whitesmoke'}}>Instalar</button> : <></> }</div>
          <p><small><i>*Para tener siempre la ultima version, puede ser necesario <a id='recarga' href="/" style={{backgroundColor: 'coral', color: 'whitesmoke', margin: '0.1em', padding: '0.2em',borderRadius: '0.2em'}}>recargar</a> la web app</i></small></p>
          <br />
          <article className='d-flex justify-content-center flex-wrap'>
            <fieldset className='d-flex align-items-center justify-content-center'>
              <legend><label htmlFor="fuente"><b>Tamaño de fuente: </b></label></legend>
              <select name="fuente" id="fuente" onChange={(e)=>{
                setFont(e.target.value);
                }} defaultValue={font}>
                <option value="sm">Pequeño</option>
                <option value="md">Normal (defecto)</option>
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
            <button className='btn p-1 my-2 c-ored'
            onClick={()=>{}}
            >Borrar Datos</button>
          </article>
          
          <h3>RECURSOS USADOS</h3>
          <p>La aplicación usa las siguientes librerias y tecnologías:</p>
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
            
          
          </div>
          <p>Si te interesa ver mis otros proyectos, ideas, o solo saber algo de mi, te dejo mí mail y algunas redes sociales:</p>
          <br />
          <h3>LINKS</h3>
          <div style={{display:'flex', flexWrap:'wrap'}}>
            <a className='btn p-1' style={{backgroundColor:'#EF9A9A', color:'whitesmoke', margin:'0.4em'}} href="mailto:cristiangramajo015@gmail.com">cristiangramajo015@gmail.com</a>
            <a className='btn p-1' style={{backgroundColor:'#64B5F6', color:'whitesmoke', margin:'0.4em'}} href="https://cristian021195.github.io/portfolio/">Portfolio</a>
            <a className='btn p-1' style={{backgroundColor:'#2196F3', color:'whitesmoke', margin:'0.4em'}} href="https://www.facebook.com/cristianismael.gramajo/">Facebook</a>
            <a className='btn p-1' style={{backgroundColor:'#fc72b7', color:'whitesmoke', margin:'0.4em'}} href="https://www.instagram.com/cristiangramajo015/">Instagram</a>
            <a className='btn p-1' style={{backgroundColor:'#2196F3', color:'whitesmoke', margin:'0.4em'}} href="https://www.linkedin.com/in/cristian-ismael-gramajo-760534165/">LinkedIn</a>
          </div>
          <br />
          <br />
          <h3>COMPARTE AL INSTANTE</h3>
          <div className='d-flex justify-content-center'>
            <div className='d-flex' style={{maxWidth:'200px'}}>
              <QRCode value={window.location.origin}></QRCode>
            </div>
          </div>
        </div>
    </section>
  )
}
// <a className='btn p-1 m-2' style={{backgroundColor:'coral', color:'whitesmoke'}} href='/'>Actualizar</a>