import React, {useEffect, useState} from 'react'
import { TablaProductosCrud } from '../Components/UI';
import { ProductoNuevoForm } from '../Components/Forms';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../DB/db';
import { cantidadProductos, cantidadTotalProductos, totalProducto } from '../Helpers';

export const Nuevo = () => {
  const [alerta, setAlerta] = useState<string>('');
  const productos = useLiveQuery(
    () => db.productos.toArray()
  );
  return (
    <section style={{textAlign:'center'}} className='pop-up'>
        <h1>Nueva Compra</h1>
        {
          productos && <h2 style={{color:'whitesmoke', backgroundColor:'coral', width:'10em', margin:'2em auto', borderRadius:'0.3em', padding:'0.5em'}}>Total: ${totalProducto(productos)}</h2>
        }
        {
          productos?.length! > 0 ? 
          <>
            <div>
              <p style={{color:'#4e4e4e'}}>
                <b><span onClick={()=>{setAlerta('Muestra la cantidad total de productos del mismo tipo.')}}>ⓘ</span> &nbsp; Productos: {cantidadProductos(productos!)}</b>&emsp; | &emsp;
                <b><span onClick={()=>{setAlerta('Muestra la cantidad total de productos totales y la suma de sus cantidades.')}}>ⓘ</span> &nbsp; Cantidad Total: {cantidadTotalProductos(productos!)}</b>
              </p>
              {alerta == '' ?
               <></> :
                <i style={{
                  color:'#6b6b6b',
                  fontSize:'0.8em'}}>
                    {alerta} <br/> 
                  <span style={{
                    color:'#FFA281', 
                    textDecoration:'underline', 
                    cursor:'pointer'}} onClick={()=>setAlerta('')}>Cerrar</span>
                  </i>}
            </div>
            <br />
          </> : 
          <></>
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
