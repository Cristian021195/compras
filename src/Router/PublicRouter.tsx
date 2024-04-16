import { Route, Routes, useLocation } from 'react-router-dom'
import { HeadTitleUrl } from '../Helpers'
import { Calculadora, Compartir, Configuracion, Inicio, Nuevo } from '../Pages'
import { IRouter } from '../Interfaces'

export const PublicRouter = ({font, setFont, theme, setTheme}:IRouter) => {
  const location = useLocation()
  HeadTitleUrl(location.pathname, 'Lista Compras');
  
  return (
    <Routes>
        <Route path='/' element={<Nuevo />}></Route>
        <Route path='/info' element={<Inicio/>}></Route>
        <Route path='/calculadora' element={<Calculadora />}></Route>
        <Route path='/configuracion' element={<Configuracion/>}></Route>
        <Route path='/compartir' element={<Compartir />}></Route>
        <Route path='*' element={<Nuevo />}></Route>
    </Routes>
  )
}