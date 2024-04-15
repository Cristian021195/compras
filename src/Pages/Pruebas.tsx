import { ZData } from "../Store"

export const Pruebas = () => {
  const {productos } = ZData((state:any)=>state);
  
  return (
    <>
      <div className='menu-header'>Pruebas</div>
      <div className='pop-up mt-4'>
        <section>
          <p>{JSON.stringify(productos, null, 2)}</p>
        </section>
        <p>Texto de prueba</p>
      </div>
    </>
  )
}
