import { FormEvent, useEffect, useState } from 'react';
import { ComputarTable, ICTProps } from '../UI/ComputarTable';
import { v4 as uuid } from 'uuid';
export const Comparadora = () => {
  const [data, setData] = useState<ICTProps[]>(JSON.parse(localStorage.getItem('calculadora') || '[]'));
  useEffect(()=>{
    if(data.length === 0){
      localStorage.setItem('calculadora', '[]');
    }else{
      localStorage.setItem('calculadora', JSON.stringify(data));
    }
  },[data])

  const saveData = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget); let fdata = Object.fromEntries(formData);
    let uid = uuid();
    let nObj = {...fdata, id:uid} as ICTProps;
    nObj.precio = parseFloat(nObj.precio+""); nObj.cantidad = parseFloat(nObj.cantidad+""); nObj.unidades = parseFloat(nObj.unidades+"");
    setData([...data, nObj]);
    e.currentTarget.reset();
  }

  const clearData = () => {
    setData([]);
  }

  return (
    <div className='col-12'>
      <form className='mb-2' onSubmit={saveData}>
          <div className="d-flex justify-content-between mb-2 mx-1">
            <label htmlFor="nombre">Nombre: </label>
            <input type="text" name="nombre" id="nombre" placeholder="Papel Higienol 4x80mts" minLength={4} maxLength={40} required />
          </div>
          <div className="d-flex justify-content-between my-2 mx-1">
            <label htmlFor="precio">Precio: </label>
            <input type="number" name="precio" id="precio" placeholder="3000" min={0.01} step={0.01} max={1000000} required />
            <span>&emsp;</span>
            <label htmlFor="cantidad">Cantidad: </label>
            <input type="number" name="cantidad" id="cantidad" placeholder="4" min={1} max={1000000} step={1} required />
          </div>
          <div className="d-flex justify-content-between my-2 mx-1">
            <label htmlFor="unidades">Unidades (mts/lts/cc/gr/kg): </label>
            <input type="number" name="unidades" id="unidades" placeholder="80" min={1} max={1000000} step={1} required />
          </div>
          <div className='d-flex justify-content-between gap-1 pb-1'>
            <button type='button' className="btn c-main text-w p-1" onClick={clearData}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
              </svg>
            </button>
            <button type='submit' className="btn c-green text-w p-1">Agregar</button>
          </div>
      </form>
        <ComputarTable data={data}/>
    </div>
  )
}
