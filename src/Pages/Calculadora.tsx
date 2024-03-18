import { Comparadora } from '../Components';

export const Calculadora = () => {
  return (
    <div className='pop-up'>
      <section id='detector'>
          <h1 className='text-center'>Calculadora</h1>
          <div className='col-6 mt-1'>
            Sirve para saber que producto es mas conveniente en relación <b>cantidad / precio</b>
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
