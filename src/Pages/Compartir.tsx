import { useLiveQuery } from 'dexie-react-hooks';
import { ICompra, IRouter } from '../Interfaces';
import { db } from '../DB/db';
import { Share } from '../Components/Icons';
import { useState } from 'react';
import { PromptDouble } from '../Components';
import { ShareFile, ShareText } from '../Helpers';

export const Compartir = () => {
  const [ promptDb, setPromptDb ] = useState(false);
  const [selectedSuper, setSelectedSuper] = useState<ICompra>();

  const listadoSuper = useLiveQuery(
    () => {
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
      {promptDb && <PromptDouble btn1='Archivo' btn2='Texto' cssClass='text-center' title='Compartir Compra' text='Seleccione el metodo de compartir su compra'
        onConfirm={() => { ShareText(selectedSuper!, () => { setPromptDb(!promptDb) }) }}
        onAlternative={() => { ShareFile(selectedSuper!, () => { setPromptDb(!promptDb) }) }}
        onCancel={() => { setPromptDb(false) }} />}
      <div className='pop-up' id='detector'>
        <section>
          <h1 className='text-center'>Compartir</h1>
          <div className='col-6'>
           Aquí están listados todos los lugares donde realizamos las compras, donde podemos descargar y compartir el listado de compras realizadas por supermercado
          </div>
        </section>
      </div>
      <section>
        <div className='d-flex justify-content-center flex-wrap gap-1'>
          <div className='stripped scroll-all vh-36'>
            <table className='sticky-header txt-nwrap text-center'>
              <thead>
                <tr>
                  <th>#</th><th className='headcol'>SUPER</th><th>FECHA</th><th>CANTIDAD</th><th>TOTAL</th><th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {
                  listadoSuper?.length === 0 ? <tr><td colSpan={6}>Sin datos</td></tr> :
                    listadoSuper?.map((e, ei) => {
                      return (<tr key={ei} className='text-center'>
                        <td>{ei}</td>
                        <td className={ei % 2 == 0 ? 'headcol c-white' : 'headcol c-gray'}>
                          <b className={ei % 2 == 0 ? 'c-white' : 'c-gray'}>{e.super}</b>
                        </td>
                        <td>{e.fecha}</td>
                        <td>{e.cantidad}</td>
                        <td>${e.total}</td>
                        <td className='d-flex justify-content-center gap-1'>
                          <button className='btn btn-sm c-sblue py-05 text-w' onClick={() => {
                            setPromptDb(true);
                            setSelectedSuper(e);
                          }}>
                            <Share />
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
