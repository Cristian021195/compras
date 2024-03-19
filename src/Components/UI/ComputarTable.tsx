import React, { Dispatch, SetStateAction } from 'react'
import { Trash  } from '../Icons';

export interface ICTProps {
    id:string,
    nombre:string,
    precio:number,
    cantidad:number,
    unidades:number
}
interface ICT{
  data: ICTProps[],
  setData: Dispatch<SetStateAction<ICTProps[]>>
}
interface ICheaper extends ICTProps {}

export const ComputarTable = ({data, setData}:ICT) => {
  let cheaper: ICTProps | undefined;
  if(data.length>0){
    cheaper = data?.reduce((p, c)=>{
      return ((c.cantidad * c.unidades)/c.precio) < ((p.cantidad * p.unidades)/p.precio) ? p : c;
    });
  }else{
    cheaper = undefined;
  }
  

  return (
    <div className='stripped scroll-all vh-36'>
        <table className='sticky-header txt-nwrap text-center'>
            <thead>
              <tr>
                <th>#</th><th className='headcol'>NOMBRE</th><th>PRECIO(P)</th><th>CANTIDAD(C)</th><th>UNIDADES(U)</th><th>TOTAL(CxU)</th><th>RELACIÓN(P/T)</th><th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {
                data.length === 0 ? <tr><td className='headcol' colSpan={6}>Sin datos</td></tr> : 
                data.map((e,ei)=>{ 
                  let m = e.cantidad * e.unidades;
                  let r = m !== 0 ? e.precio / m : 0;
                  return (<tr key={ei} className={cheaper?.id === e.id ? 'c-lgreen' : ''}>
                          <td>{ei}</td>
                          <td className={ei % 2 === 0 ? 'headcol c-white' : 'headcol c-gray'}><b>{ cheaper?.id === e.id ? e.nombre+" ★" : e.nombre }</b></td>
                          <td>${e.precio}</td>
                          <td>{e.cantidad}</td>
                          <td>{e.unidades}</td>
                          <td>{(parseFloat(e.unidades+"") * parseFloat(e.cantidad+"")).toFixed(2)}</td>
                          <td>{r.toFixed(2)}</td>
                          <td>
                            <button className='btn btn-sm c-sblue py-05 text-w' onClick={()=>{
                              setData(data.filter(d=>d.id!=e.id));
                            }}>
                              <Trash/>
                            </button>
                          </td>
                          </tr>)
                  })
              }
            </tbody>
        </table>
    </div>
  )
}
