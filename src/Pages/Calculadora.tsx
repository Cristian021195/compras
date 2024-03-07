import { useSlideRouter } from '../Hooks';
import { IRouter } from '../Interfaces';

export const Calculadora = ({runner, setRunner}:IRouter) => {
  const {pos1, pos2, setPos1, setPos2} = useSlideRouter(window.location.pathname, runner, setRunner);
  return (
    <section style={{textAlign:'center'}} className='pop-up' id='detector'>
        <h1>Calculadora</h1>
        <div style={{textAlign:'start', margin:'2em auto'}} className='col-6'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur, laboriosam provident quasi voluptatibus sed quos, voluptatum sit repellat cumque deleniti vel omnis aperiam earum suscipit ea, voluptates obcaecati animi nulla?
        </div>
    </section>
  )
}
