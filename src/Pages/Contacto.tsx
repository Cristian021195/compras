import React from 'react'
import QRCode from "react-qr-code";
import { useSlideRouter } from '../Hooks';
import { IRouter } from '../Interfaces';


export const Contacto = ({runner, setRunner}:IRouter) => {
  const {pos1, pos2, setPos1, setPos2} = useSlideRouter(window.location.pathname, runner, setRunner);
  return (
    <section style={{textAlign:'center'}} className='pop-up' id='detector'>
        <h1>Contacto</h1>
        <div style={{textAlign:'start', margin:'2em auto'}} className='col-6'>
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
