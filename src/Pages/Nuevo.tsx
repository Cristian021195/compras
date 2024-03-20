import {useState} from 'react'
import { TablaProductosCrud } from '../Components/UI';
import { ProductoNuevoForm } from '../Components/Forms';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../DB/db';
import { cantidadProductos, cantidadTotalProductos, totalProducto } from '../Helpers';

export const Nuevo = () => {
  const [alerta, setAlerta] = useState<string>('');
  const [superm, setSuperm] = useState<string>('');
  const productos = useLiveQuery(
    () => db.productos.toArray().then((pds)=>pds.filter((sup)=>sup.super === superm))
  ,[superm]);
  return (
    <div>
      <section className='pop-up' id='detector'>
        {
          productos && <><h2 className='total-status text-center text-w'>Total: ${totalProducto(productos).toFixed(2)}</h2></>
        }
        {
          productos?.length! > 0 ?
            <>
              <div>
                <div className='info-counter'>
                  <p>
                    <b><span onClick={() => { setAlerta('Muestra la cantidad total de productos del mismo tipo.') }}>ⓘ</span> &nbsp; Productos: {cantidadProductos(productos!)}</b>
                  </p>
                  <p>
                    <b><span onClick={() => { setAlerta('Muestra la cantidad total de productos totales y la suma de sus cantidades.') }}>ⓘ</span> &nbsp; Cantidad Total: {cantidadTotalProductos(productos!)}</b>
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
            </> :
            <></>
        }
        <div className='d-flex justify-content-center flex-wrap gap-1'>
          <ProductoNuevoForm setSuperm={setSuperm} total={parseFloat(totalProducto(productos!).toFixed(2))} />
        </div>
      </section>
      <section className='d-flex justify-content-center vh-58'>
        <TablaProductosCrud clases='stripped scroll-all mb-01' sel={superm} />
      </section>
    </div>
  )
}
