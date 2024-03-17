import React from 'react'

interface Iprops {
    id:string,
    nombre:string,
    precio:number,
    unidades:number
}

export const DynamicTable = (data:Iprops[]) => {
  return (
    <div className='table-responsive'>
        <table>
            
        </table>
    </div>
  )
}
