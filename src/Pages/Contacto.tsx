import React from 'react'

export const Contacto = () => {
  return (
    <section style={{textAlign:'center'}} className='pop-up'>
        <h1>Contacto</h1>
        <div style={{textAlign:'start', margin:'2em auto'}} className='col-6'>
          <p>Si te interesa ver mis otros proyectos, ideas, o solo saber algo de mi, te dejo mi mail y algunas redes sociales:</p>
          <br />
          <h3>LINKS</h3>
          <div style={{display:'flex', flexWrap:'wrap'}}>
            <a className='btn p-1' style={{backgroundColor:'#EF9A9A', color:'whitesmoke', margin:'0.4em'}} href="mailto:cristiangramajo015@gmail.com">cristiangramajo015@gmail.com</a>
            <a className='btn p-1' style={{backgroundColor:'#64B5F6', color:'whitesmoke', margin:'0.4em'}} href="https://cristian021195.github.io/portfolio/">Portfolio</a>
            <a className='btn p-1' style={{backgroundColor:'#2196F3', color:'whitesmoke', margin:'0.4em'}} href="https://www.facebook.com/cristianismael.gramajo/">Facebook</a>
            <a className='btn p-1' style={{backgroundColor:'#fc72b7', color:'whitesmoke', margin:'0.4em'}} href="https://www.instagram.com/cristiangramajo015/">Instagram</a>
            <a className='btn p-1' style={{backgroundColor:'#2196F3', color:'whitesmoke', margin:'0.4em'}} href="https://www.linkedin.com/in/cristian-ismael-gramajo-760534165/">LinkedIn</a>
          </div>
        </div>
        
    </section>
  )
}
