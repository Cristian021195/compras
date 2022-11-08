import React from 'react'

export const Inicio = () => {
  return (
    <section style={{textAlign:'center'}} className='pop-up'>
        <h1>Inicio</h1>
        <div style={{textAlign:'start', margin:'2em auto'}} className='col-6'>
          <p><b>ListaCompras</b> es una app sencilla, el proposito es para mis practicas en Desarrollo Web.</p>
          <p>El proposito de la app es surge al momento de tener que hacer compras en el supermercado, e ir cargando lo que necesitemos para tener mayor control de que compramos y cuanto vale cada cosa.</p>
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
        </div>
    </section>
  )
}
