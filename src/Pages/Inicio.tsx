import React, { useEffect, useState } from 'react'
import { useSlideRouter } from '../Hooks';
import { IRouter } from '../Interfaces';

export const Inicio = ({runner, setRunner, font,setFont}:IRouter) => {
  const {pos1, pos2, setPos1, setPos2} = useSlideRouter(window.location.pathname, runner, setRunner);
  const [bip, setBip] = useState<any>(undefined);
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
          <p><b>ListaCompras</b> es una app sencilla, el propósito es para mis prácticas en Desarrollo Web.</p>
          <p>El propósito de la app es surge al momento de tener que hacer compras en el supermercado, e ir cargando lo que necesitemos para tener mayor control de que compramos y cuánto vale cada cosa.</p>
          <br />
          <article className='d-flex justify-content-center'>
            <fieldset className='d-flex align-items-center justify-content-center'>
              <legend><label htmlFor="fuente"><b>Tamaño de fuente: </b></label></legend>
              <select name="fuente" id="fuente" onChange={(e)=>{
                setFont(e.target.value);
                localStorage.setItem('font', e.target.value);
                document.body.className = '';
                document.body.classList.add('font-'+e.target.value);
                }} defaultValue={font}>
                <option value="sm">Pequeño</option>
                <option value="md">Normal</option>
                <option value="lg">Grande</option>
              </select>
            </fieldset>
          </article>
          
          <h3>RECURSOS USADOS</h3>
          <p>La aplicación usa los siguientes recursos:</p>
          <ul className='recursos' style={{width:'12em', margin:'0 auto'}}>
            <li>React JS</li>
            <li>TypeScript</li>
            <li>Vite</li>
            <li>Vite PWA</li>
            <li>React Router DOM</li>
            <li>uuid</li>
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
                className='btn p-1' style={{backgroundColor:'coral', color:'whitesmoke'}}>Instalar</button> : <></> }
          </div>
        </div>
    </section>
  )
}
