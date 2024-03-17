import { Comparadora } from '../Components';
import { useSlideRouter } from '../Hooks';
import { IRouter } from '../Interfaces';

export const Calculadora = ({runner, setRunner}:IRouter) => {
  useSlideRouter(window.location.pathname, runner, setRunner);
  return (
    <div className='pop-up'>
      <section id='detector'>
          <h1 className='text-center'>Calculadora</h1>
          <div className='col-6 mt-1'>
            Sirve para saber que producto es mas conveniente en relacion <b>cantidad / precio</b>
          </div>
      </section>
      <section>
        <div className='d-flex justify-content-center flex-wrap gap-1'>
            <Comparadora/>
        </div>
      </section>
    </div>
  )
}
