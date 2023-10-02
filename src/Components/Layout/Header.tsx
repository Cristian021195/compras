import React from 'react'
import { NavLink } from 'react-router-dom';
import { IRouter } from '../../Interfaces';


export const Header = ({runner, setRunner}:IRouter) => {
    return (
        <header className='d-flex justify-content-end align-items-center' style={{zIndex:3}}>
          <ul style={{display:'flex', justifyContent:'start'}} className='h-scroll-style'>
            <li>
                <NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to='/' onClick={()=>setRunner(0)}>Inicio</NavLink>
            </li>            
            <li>
                <NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to='/nuevo' onClick={()=>setRunner(1)}>Nueva Compra</NavLink>
            </li>
            <li>
                <NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to='/contacto' onClick={()=>setRunner(2)}>Contacto</NavLink>
            </li>
          </ul>
        </header>
      );
}
/*
<NavLink to='/' className={({isActive})=> isActive === true ? 'actual' : ''}  onClick={()=>setRunner(0)}>Inicio</NavLink>
<NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to={'/nuevo'} onClick={()=>setRunner(1)}>Nueva Compra</NavLink>
<NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to={'/contacto'} onClick={()=>setRunner(2)}>Contacto</NavLink>

<NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to={'/inicio'}>Inicio</NavLink>
<NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to={'/nuevo'}>Nueva Compra</NavLink>
<NavLink className={({isActive})=> isActive === true ? 'actual' : ''} to={'/contacto'}>Contacto</NavLink>

<a onClick={()=>setRunner(0)}>Inicio</a>
<a onClick={()=>setRunner(1)}>Nueva Compra</a>
<a onClick={()=>setRunner(2)}>Contacto</a>
*/