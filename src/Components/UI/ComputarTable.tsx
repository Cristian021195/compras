import React from 'react'

export interface ICTProps {
    id:string,
    nombre:string,
    precio:number,
    cantidad:number,
    unidades:number
}
interface ICT{
  data: ICTProps[]
}

export const ComputarTable = ({data}:ICT) => {
  let cheaper = data.reduce((p, c)=>{
    return ((c.cantidad * c.unidades)/c.precio) < ((p.cantidad * p.unidades)/p.precio) ? p : c;
  });

  return (
    <div className='stripped scroll-all vh-36'>
        <table className='sticky-header'>
            <thead>
              <tr>
                <th>#</th><th className='headcol'>NOMBRE</th><th>PRECIO</th><th>CANTIDAD</th><th>UNIDADES</th><th>RELACION</th>
              </tr>
            </thead>
            <tbody>
              {
                data.length === 0 ? <tr><td className='headcol' colSpan={5}>Sin datos</td></tr> : 
                data.map((e,ei)=>{ 
                  let m = e.cantidad * e.unidades;
                  let r = m !== 0 ? e.precio / m : 0;
                  return (<tr key={ei} className={cheaper.id === e.id ? 'c-lgreen' : ''}>
                          <td>{ei}</td>
                          <td className={ei % 2 === 0 ? 'headcol c-white' : 'headcol c-gray'}>{e.nombre}</td>
                          <td>{e.precio}</td><td>{e.cantidad}</td><td>{e.unidades}</td><td>{r}</td>
                          </tr>)
                  })
              }
            </tbody>
        </table>
    </div>
  )
}
