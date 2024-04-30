import { Link } from 'react-router-dom';
import { Apple, Back, BoxArrowUp, PlusSquare } from '../Components/Icons';
import src1 from '../assets/scr1.webp';
import src2 from '../assets/scr2.webp';
import src3 from '../assets/scr3.webp';

export const IPhone = () => {
  return (//<h1 className='text-center'>Info y Contacto</h1>
    <><div className='menu-header'>
      <Link to={'/info'} className='btn me-2'><Back/></Link> Instructivo IPhone <Apple/></div>
      <div className='pop-up mt-4' id='detector'>
        <section>
          <div className='mb-3'>
            <p>Los pasos a seguir de manera resumida son: Estar dentro de la app <b className='fs-1'>&gt;</b> Tocar el menu expandible que muestra las opciones <b className='fs-1'>&gt;</b> Agregar a la pantalla principal <b className='fs-1'>&gt;</b> Done / Add</p>
            <br />
            <p>Los pasos detallados son:</p>
            <div className='gallery'>
              <p>Paso 1: Seleccione <span className='t-sblue'><BoxArrowUp/></span></p>
              <img src={src1} alt="Paso 1"/>
              <p>Paso 2: Seleccione <span className='t-sblue'><PlusSquare/></span></p>
              <img src={src2} alt="Paso 2"/>
              <p>Paso 3: Seleccione <b className='t-sblue'>Add</b>, incluso puede cambiarse el nombre</p>
              <img src={src3} alt="Paso 3"/>
            </div>
          </div>
        </section>
      </div>
    </>
    
  )
}