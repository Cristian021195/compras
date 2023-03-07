import React, {useEffect} from 'react'
import { TablaProductosCrud } from '../Components/UI';
import { ProductoNuevoForm } from '../Components/Forms';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../DB/db';
import { totalProducto } from '../Helpers';

export const Nuevo = () => {
  const productos = useLiveQuery(
    () => db.productos.toArray()
  );
  return (
    <section style={{textAlign:'center'}} className='pop-up'>
        <h1>Nueva Compra</h1>
        {
          productos && <h2 style={{color:'whitesmoke', backgroundColor:'coral', width:'10em', margin:'2em auto', borderRadius:'0.3em', padding:'0.5em'}}>Total: ${totalProducto(productos)}</h2>
        }
        <div style={{display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'1em'}}>
          <ProductoNuevoForm/>
          <br />
          <TablaProductosCrud clases='stripped'/>
          <br />
        </div>
    </section>
  )//<a href="#top" style={{backgroundColor:'rgba(255,127,80,0.7)', color:'whitesmoke', padding:'1em', borderRadius:'50%', textDecoration:'none', position:'fixed', bottom:'1em', right:'1em'}}>▲</a>
}
