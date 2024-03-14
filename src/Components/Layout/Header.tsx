import React from 'react'
import { NavLink } from 'react-router-dom';
import { IRouter } from '../../Interfaces';
import { Calculator, Info, Share, ShoppingCart, Stats } from '../Icons';


export const Header = ({ runner, setRunner }: IRouter) => {
  return (
    <footer className="cvxc-bar-div">
      <div className="cvxc-bar">
        <NavLink to='/nuevo' onClick={()=>setRunner(0)}>
          <ShoppingCart/>
        </NavLink>
        <NavLink to='/calculadora' onClick={()=>setRunner(1)}>
          <Calculator/>
        </NavLink>
        <NavLink to='/estadistica' onClick={()=>setRunner(2)}>
          <Stats/>
        </NavLink>
        <NavLink to='/compartir' onClick={()=>setRunner(3)}>
          <Share/>
        </NavLink>
        <NavLink to='/' className={"no-select"} onClick={()=>setRunner(4)}>
          <Info/>
        </NavLink>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="filter-svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1 0" result="blur" />
              <feColorMatrix mode="matrix" colorInterpolationFilters="sRGB" values="0.12 0 0 0 0    0 0.56 0 0 0    0 0 1.00 0 0    0 0 0 1 0" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      </div>
    </footer>
  );
}
/*
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
*/