import { NavLink } from 'react-router-dom';
import { Calculator, Gear, Info, Share, ShoppingCart, Stats } from '../Icons';


export const Header = () => {
  return (
    <footer className="cvxc-bar-div">
      <div className={ /iPad|iPhone|iPod/.test(navigator.userAgent) ? "cvxc-bar pb-1" : "cvxc-bar"}>
        <NavLink to='/'>
          <ShoppingCart/>
        </NavLink>
        <NavLink to='/calculadora'>
          <Calculator/>
        </NavLink>
        <NavLink to='/compartir'>
          <Share/>
        </NavLink>
        <NavLink to='/configuracion'>
          <Gear/>
        </NavLink>        
        <NavLink to='/info' className={"no-select"}>
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