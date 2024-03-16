import React, {useEffect, useState} from 'react'
import { TablaProductosCrud } from '../Components/UI';
import { ProductoNuevoForm } from '../Components/Forms';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../DB/db';
import { cantidadProductos, cantidadTotalProductos, totalProducto } from '../Helpers';
import { useSlideRouter } from '../Hooks';
import { IRouter } from '../Interfaces';

/*
<p style={{color:'#4e4e4e'}}>
  <b><span onClick={()=>{setAlerta('Muestra la cantidad total de productos del mismo tipo.')}}>ⓘ</span> &nbsp; Productos: {cantidadProductos(productos!)}</b>
  <br/><b><span onClick={()=>{setAlerta('Muestra la cantidad total de productos totales y la suma de sus cantidades.')}}>ⓘ</span> &nbsp; Cantidad Total: {cantidadTotalProductos(productos!)}</b>
</p>
*/

export const Nuevo = ({runner, setRunner}:IRouter) => {
  const {pos1, pos2, setPos1, setPos2} = useSlideRouter(window.location.pathname, runner, setRunner);
  const [alerta, setAlerta] = useState<string>('');
  const [superm, setSuperm] = useState<string>('');
  const productos = useLiveQuery(
    () => db.productos.toArray().then((pds)=>pds.filter((sup)=>sup.super === superm))
  ,[superm]);
  return (
    <div>
      <section style={{textAlign:'center'}} className='pop-up' id='detector'>
          {
            productos && <><h2 className='total-status text-w'>Total: ${totalProducto(productos).toFixed(2)}</h2></>
          }
          {
            productos?.length! > 0 ? 
            <>
              <div>
                <div className='info-counter'>
                  <p>
                    <b><span onClick={()=>{setAlerta('Muestra la cantidad total de productos del mismo tipo.')}}>ⓘ</span> &nbsp; Productos: {cantidadProductos(productos!)}</b>
                  </p>
                  <p>                
                    <b><span onClick={()=>{setAlerta('Muestra la cantidad total de productos totales y la suma de sus cantidades.')}}>ⓘ</span> &nbsp; Cantidad Total: {cantidadTotalProductos(productos!)}</b>
                  </p>
                </div>
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
            <ProductoNuevoForm setSuperm={setSuperm} total={parseFloat(totalProducto(productos!).toFixed(2))}/>
          </div>
      </section>
      <section className='d-flex justify-content-center vh-58'>
        <TablaProductosCrud clases='stripped scroll-all mb-1' sel={superm}/>
      </section>
    </div>
  )
}
