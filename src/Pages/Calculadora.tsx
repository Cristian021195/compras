import { useState } from 'react';
import { Comparadora } from '../Components';

export const Calculadora = () => {
  const [info, setInfo] = useState(false);
  return (
    <>
    <div className='menu-header'>Calculadora</div>
    <div className='pop-up mt-4'>
      <section id='detector'>
          <div className='col-6 mt-1'>
            Sirve para saber que producto es mas conveniente en relación cantidad / precio <span onClick={()=>{setInfo(!info)}}><b style={{color:'coral'}}>ⓘ</b></span>
          </div>
          <div className={info ? '' : 'd-none'}>
            <small><i>
              Por ejemplo: tenemos un papel higiénico "A", que su paquete contiene 12 rollos de 30mts c/u a $6350, y un papel higiénico "B"
              que su paquete contiene 4 rollos de 80mts c/u a $2369. ¿Cual nos rendirá más? <br /><br />
              Otro ejemplo: tenemos una mostaza de 250g a $620, y tenemos otra de una marca diferente (o igual) de 500g a $1350 
              y queremos saber si nos conviene llevar una grande, o dos pequeñas. <br /> Para ello tenemos que tener en cuenta que hablemos de las mismas
              unidades. Si un producto está en gramos y otro en kilos, llevamos todo a gramos.
              <br />Solo ponemos el nombre, el precio y que las unidades sean coincidentes y en la tabla se vera de color verde el producto 
              que sea más conveniente. <br />
              A tener en cuenta: la cantidad sería el número de elementos que vienen en un producto en particular. Por ejemplo,
              papel higiénico 4 unidades de 80mts, donde cantidad seria 4, y unidad 80 </i><span style={{color:'coral'}} onClick={()=>{setInfo(false)}}><u>cerrar</u></span></small>
          </div>
      </section>
      <section>
        <div className='d-flex justify-content-center flex-wrap gap-1'>
            <Comparadora/>
        </div>
      </section>
    </div>
    </>
  )
}
