import { useLiveQuery } from 'dexie-react-hooks';
import { useSlideRouter } from '../Hooks';
import { IRouter } from '../Interfaces';
import { db } from '../DB/db';
import { Share, Upload } from '../Components/Icons';

export const Compartir = ({runner, setRunner}:IRouter) => {
  const {pos1, pos2, setPos1, setPos2} = useSlideRouter(window.location.pathname, runner, setRunner);

  const listadoSuper = useLiveQuery(
    () => {
        //db.compra.limit(1)
        //.toArray().then((res:any)=>{console.log(res)})
        let compras = db.compra.toArray();
        compras.then((resc)=>{
            if(resc.length > 0){

            }
        })
        return compras || [];
    }
  );

  return (
    <>
      <section style={{textAlign:'center'}} className='pop-up' id='detector'>
          <h1>Compartir</h1>
          <div style={{textAlign:'start', margin:'2em auto'}} className='col-6'>
            Aqui estan listadas todos los lugares donde realizamos las compras, donde podemos descargar y compartir el listado de compras realizadas por supermercado
          </div>
      </section>
      <section>
        <div style={{display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'1em'}}>
          <div className='stripped scroll-all vh-36'>
            <table className='sticky-header'>
              <thead>
                <tr>
                  <th>#</th><th className='headcol'>SUPER</th><th>FECHA</th><th>TOTAL</th><th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {
                  listadoSuper?.length === 0 ? <tr><td className='headcol' colSpan={5}>Sin datos</td></tr> : 
                  listadoSuper?.map((e,ei)=>{ 
                    return (<tr key={ei}>
                              <td>{ei}</td>
                              <td className='txt-nwrap'>{e.super}</td>
                              <td className='txt-nwrap'>{e.fecha}</td>
                              <td className='txt-nwrap'>$1505</td>
                              <td className='d-flex justify-content-center gap-1'>
                                <button className='btn btn-sm c-sblue py-05 text-w'>
                                  <Share/>
                                </button>
                              </td>
                            </tr>)
                    })
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}//<td>{e.precio}</td><td>{e.cantidad}</td><td>{e.unidades}</td><td>{r.toFixed(2)}</td>
