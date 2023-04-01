import React, { useEffect, useState } from 'react'
import { useSlideRouter } from '../Hooks';
import { IRouter } from '../Interfaces';

export const Inicio = ({runner, setRunner}:IRouter) => {
  const {pos1, pos2, setPos1, setPos2} = useSlideRouter(window.location.pathname, runner, setRunner);
  const [bip, setBip] = useState<any>(undefined);
  useEffect(()=>{
        window.addEventListener('beforeinstallprompt', (event) => {
            setBip(event)
        });
  },[])
  return (
    <section style={{textAlign:'center'}} className='pop-up' id='detector'>
        <h1>Inicio</h1>
        <div style={{textAlign:'start', margin:'2em auto'}} className='col-6'>
          <p><b>ListaCompras</b> es una app sencilla, el propósito es para mis prácticas en Desarrollo Web.</p>
          <p>El propósito de la app es surge al momento de tener que hacer compras en el supermercado, e ir cargando lo que necesitemos para tener mayor control de que compramos y cuánto vale cada cosa.</p>
          <br />
          <h3>RECURSOS USADOS</h3>
          <p>La aplicación usa los siguientes recursos:</p>
          <ul style={{width:'12em', margin:'0 auto'}}>
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
