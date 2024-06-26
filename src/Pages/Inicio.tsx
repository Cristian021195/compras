import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';

export const Inicio = () => {
  const [shareError, setShareError] = useState(false);
  return (//<h1 className='text-center'>Info y Contacto</h1>
    <><div className='menu-header'>Información y Contacto</div>
      <div className='pop-up mt-4' id='detector'>
        <section>
          <div className='mb-3'>
            <p><b>ListaCompras (Beta v3)</b>, es una aplicación simple, creada para mis prácticas en el Desarrollo Web.</p>
            <p>La app es surge al momento de tener que hacer compras en el supermercado, e ir cargando lo que necesitemos, asi tener mayor control de que compramos.</p>
            <p><small><i>*Para tener siempre la ultima versión, puede ser necesario <a id='recarga' href="/" className='btn c-main p-05'>recargar</a> la web app</i></small></p>
            <p><small><i><b>IMPORTANTE</b> si tu celular es <b>IPhone</b>, para instalar o tener el accesso directo debes seguir las siguientes instrucciones: <Link to='/iphone' className='btn c-lblue p-05'>Instructivo Iphone</Link></i></small></p>
            <p><small><i>Si tu celular es <b>Android</b> debes seguir las siguientes instrucciones: <Link to='/android' className='btn c-green p-05'>Instructivo Android</Link></i></small></p>
            <br />
            <h3>RECURSOS USADOS</h3>
            <p>La aplicación usa las siguientes librerias y tecnologías:</p>
            <ul className='recursos col-6 mx-3 ps-2'>
              <li>React JS</li>
              <li>TypeScript</li>
              <li>Vite</li>
              <li>Vite PWA</li>
              <li>React Router DOM</li>
              <li>Zustand</li>
              <li>uuid v4</li>
              <li>Dexie JS</li>
              <li>dexie-react-hooks</li>
            </ul>
            <div>
            </div>
            <p>Si te interesa ver mis otros proyectos, ideas, o solo saber algo de mi, te dejo mí mail y algunas redes sociales:</p>
            <br />
            <h3>LINKS</h3>
            <div className='d-flex flex-wrap gap-1'>
              <a className='btn p-1 c-pink' href="mailto:cristiangramajo015@gmail.com">cristiangramajo015@gmail.com</a>
              <a className='btn p-1 c-lblue' href="https://cristian021195.github.io/portfolio/">Portfolio</a>
              <a className='btn p-1 c-sblue' href="https://www.facebook.com/cristianismael.gramajo/">Facebook</a>
              <a className='btn p-1 c-spink' href="https://www.instagram.com/cristiangramajo015/">Instagram</a>
              <a className='btn p-1 c-sblue' href="https://www.linkedin.com/in/cristian021195">LinkedIn</a>
            </div>
            <br />
            <br />
            <h3>COMPARTE AL INSTANTE</h3>
            <div className='d-flex justify-content-center flex-wrap'>
              <div className='d-flex align-items-center c-white p-1'>
                <QRCode value={window.location.origin}></QRCode>
              </div>              
            </div>
            <div className='p-1 text-center'>
                <button className='btn p-1 c-main' disabled={shareError}
                  onClick={async (e)=>{
                    try {                      
                      await navigator.share({
                        title: "ListaCompras",
                        text: "App para hacer las compras, llevar control y compartir precios",
                        url: location.origin+"",
                      });
                    } catch (err) {
                      setShareError(true);
                      setTimeout(() => {
                        setShareError(false);
                      }, 2500);
                    }
                  }}
                >COMPARTIR</button>
              </div>
              {shareError && <span className='btn p-05 text-r'>Error al compartir, copie el enlace manualmente</span>}
          </div>
        </section>
      </div>
    </>
    
  )
}