import React from 'react'
import { NavLink } from 'react-router-dom';

export const Header = () => {
    return (
        <header className='d-flex justify-content-end align-items-center' style={{zIndex:1}}>
          <ul style={{display:'flex', justifyContent:'start'}} className='h-scroll-style'>
            <li>
                <NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to={'/inicio'}>Inicio</NavLink>
            </li>            
            <li>
                <NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to={'/nuevo'}>Nueva Compra</NavLink>
            </li>
            <li>
                <NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to={'/contacto'}>Contacto</NavLink>
            </li>
          </ul>
        </header>
      );
}
  