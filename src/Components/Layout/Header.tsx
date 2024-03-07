import React from 'react'
import { NavLink } from 'react-router-dom';
import { IRouter } from '../../Interfaces';


export const Header = ({ runner, setRunner }: IRouter) => {
  return (
    <footer className="cvxc-bar-div">
      <div className="cvxc-bar">
        <NavLink to='/nuevo' onClick={()=>setRunner(0)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
          </svg>
        </NavLink>
        <NavLink to='/calculadora' onClick={()=>setRunner(1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </NavLink>
        <NavLink to='/estadistica' onClick={()=>setRunner(2)}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0842 13C13.0842 93.6025 7.46557 87.9129 88 87.9129" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
            <path d="M35 61C66.1475 4.87692 49.3442 82.6308 85 23" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
          </svg>
        </NavLink>
        <NavLink to='/compartir' onClick={()=>setRunner(3)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 18 16">
            <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
          </svg>
        </NavLink>
        <NavLink to='/' className={"no-select"} onClick={()=>setRunner(4)}>
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>information-circle</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                  <rect width="48" height="48" fill="none"></rect>
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                  <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Zm0,40A18,18,0,1,1,42,24,18.1,18.1,0,0,1,24,42Z"></path>
                  <path d="M24,20a2,2,0,0,0-2,2V34a2,2,0,0,0,4,0V22A2,2,0,0,0,24,20Z"></path>
                  <circle cx="24" cy="14" r="2"></circle> 
                </g> 
              </g>
            </g>
          </svg>
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