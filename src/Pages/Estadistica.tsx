import { useSlideRouter } from '../Hooks';
import { IRouter } from '../Interfaces';

export const Estadistica = ({runner, setRunner}:IRouter) => {
  const {pos1, pos2, setPos1, setPos2} = useSlideRouter(window.location.pathname, runner, setRunner);
  return (
    <section style={{textAlign:'center'}} className='pop-up' id='detector'>
        <h1>Estadistica</h1>
        <div style={{textAlign:'start', margin:'2em auto'}} className='col-6'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium cupiditate, ab omnis ipsa repudiandae, quidem soluta ducimus at perferendis nulla laudantium! Repellendus omnis rem totam dolore a, corporis aperiam consequatur!
        </div>        
    </section>
  )
}
