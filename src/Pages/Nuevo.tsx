
import {useState} from 'react'
import { TablaProductosCrud } from '../Components/UI';
import { ProductoNuevoForm } from '../Components/Forms';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../DB/db';
import { cantidadProductos, cantidadTotalProductos, totalProducto } from '../Helpers';
import { ZMainForm } from '../Store';

export const Nuevo = () => {
  const [alerta, setAlerta] = useState<string>('');
  const {selected_super} = ZMainForm((state)=>state);
  const productos = useLiveQuery(
    () => db.productos.toArray().then((pds)=>pds.filter((sup)=>sup.super === selected_super))
  ,[selected_super]);
  return (
    <div>
      <section className='pop-up' id='detector'>
        <h2 className='total-status text-center text-w'>Total: ${totalProducto(productos!).toFixed(2)}</h2>        
        <div>
          <div className='info-counter d-flex flex-wrap justify-content-between'>
            <p>
              <b><span onClick={() => { setAlerta('Muestra la cantidad total de productos del mismo tipo.') }}>ⓘ</span> Productos: {cantidadProductos(productos!)}</b>
            </p>
            <p className="">
              <b><span onClick={() => { setAlerta('Muestra la cantidad total de productos totales y la suma de sus cantidades.') }}>ⓘ</span> Cantidad Total: {cantidadTotalProductos(productos!)}</b>
            </p>
          </div>
          {alerta == '' ?
            <></> :
            <i className='fs-08 p-05'>
              {alerta} <br />
              <button className='btn c-seorange' onClick={() => setAlerta('')}>Cerrar</button>
            </i>}
        </div>
              <br />
        <div className='d-flex justify-content-center flex-wrap gap-1'>
          <ProductoNuevoForm/>
        </div>
      </section>
      <section className='d-flex justify-content-center vh-58'>
        <TablaProductosCrud/>
      </section>
    </div>
  )
}