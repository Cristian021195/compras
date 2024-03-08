import { Comparadora } from '../Components';
import { useSlideRouter } from '../Hooks';
import { IRouter } from '../Interfaces';

export const Calculadora = ({runner, setRunner}:IRouter) => {
  const {pos1, pos2, setPos1, setPos2} = useSlideRouter(window.location.pathname, runner, setRunner);
  return (
    <div style={{textAlign:'center'}} className='pop-up'>
      <section id='detector'>
          <h1>Calculadora</h1>
          <div style={{textAlign:'start', marginTop:'2em auto'}} className='col-6'>
            Sirve para saber que producto es mas conveniente en relacion <b>cantidad / precio</b>
          </div>
      </section>
      <section>
        <div style={{display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'1em'}}>
            <Comparadora/>
        </div>
      </section>
    </div>
  )
}
