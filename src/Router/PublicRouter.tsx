import { Route, Routes, useLocation } from 'react-router-dom'
import { HeadTitleUrl } from '../Helpers'
import { Calculadora, Compartir, Configuracion, Inicio, Nuevo, Pruebas } from '../Pages'
import { IRouter } from '../Interfaces'

export const PublicRouter = ({font, setFont, theme, setTheme}:IRouter) => {
  const location = useLocation()
  HeadTitleUrl(location.pathname, 'Lista Compras');
  
  return (//<Route path='/' element={<Nuevo />}></Route>
    <Routes>
        <Route path='/nuevo' element={<Nuevo />}></Route>
        <Route path='/' element={<Pruebas/>}></Route>
        <Route path='/info' element={<Inicio/>}></Route>
        <Route path='/calculadora' element={<Calculadora />}></Route>
        <Route path='/pruebas' element={<Pruebas/>}></Route>
        <Route path='/configuracion' element={<Configuracion/>}></Route>
        <Route path='/compartir' element={<Compartir />}></Route>
        <Route path='*' element={<Nuevo />}></Route>
    </Routes>
  )
}