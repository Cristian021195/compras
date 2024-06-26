import { Link } from 'react-router-dom';
import { Apple, Back, BoxArrowUp, PlusSquare, AndroidIcon, MenuDotsIcon, AddToHomeSreenIcon } from '../Components/Icons';
import src4 from '../assets/src4.webp';
import src5 from '../assets/src5.webp';
import src6 from '../assets/src6.webp';

export const Android = () => {
  return (//<h1 className='text-center'>Info y Contacto</h1>
    <><div className='menu-header'>
      <Link to={'/info'} className='btn me-2'><Back/></Link> Instructivo Android <AndroidIcon/></div>
      <div className='pop-up mt-4' id='detector'>
        <section>
          <div className='mb-3'>
            <p>Los pasos a seguir de manera resumida son: Estar dentro de la app <b className='fs-1'>&gt;
              </b> Tocar el menu expandible (tres puntos en la esquina superior derecha) que muestra las opciones <b className='fs-1'>&gt;
                </b> Agregar a la pantalla principal o Instalar aplicación <b className='fs-1'>&gt;</b> Instalar</p>
            <br />
            <p>Los pasos detallados son:</p>
            <div className='gallery'>
              <p>Paso 1: Seleccione <span><MenuDotsIcon/></span></p>
              <img src={src4} alt="Paso 1"/>
              <p>Paso 2: Seleccione <span><AddToHomeSreenIcon/></span></p>
              <img src={src5} alt="Paso 2"/>
              <p>Paso 3: Seleccione <b className='t-sblue'>Instalar</b></p>
              <img src={src6} alt="Paso 3"/>
            </div>
          </div>
        </section>
      </div>
    </>
    
  )
}