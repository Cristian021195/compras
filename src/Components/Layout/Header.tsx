import React from 'react'
import { NavLink } from 'react-router-dom';
import { IRouter } from '../../Interfaces';


export const Header = ({runner, setRunner}:IRouter) => {
    return (
        <header className='d-flex justify-content-end align-items-center' style={{zIndex:1}}>
          <ul style={{display:'flex', justifyContent:'start'}} className='h-scroll-style'>
            <li>
                <a onClick={()=>setRunner(0)}>Inicio</a>
            </li>            
            <li>
                <a onClick={()=>setRunner(1)}>Nueva Compra</a>
            </li>
            <li>
                <a onClick={()=>setRunner(2)}>Contacto</a>
            </li>
          </ul>
        </header>
      );
}
/*
<NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to={'/inicio'}>Inicio</NavLink>
<NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to={'/nuevo'}>Nueva Compra</NavLink>
<NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to={'/contacto'}>Contacto</NavLink>
*/