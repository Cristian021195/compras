import { Route, Routes, useLocation } from 'react-router-dom'
import { HeadTitleUrl } from '../Helpers'
import { Calculadora, Compartir, Configuracion, Inicio, Nuevo } from '../Pages'
import { IRouter } from '../Interfaces'

export const PublicRouter = ({runner, setRunner, font, setFont, theme, setTheme}:IRouter) => {
  const location = useLocation()
  HeadTitleUrl(location.pathname, 'Lista Compras');
  
  return (
    <Routes>        
        <Route path='/' element={<Inicio runner={runner} setRunner={setRunner}/>}></Route>
        <Route path='/nuevo' element={<Nuevo runner={runner} setRunner={setRunner}/>}></Route>
        <Route path='/calculadora' element={<Calculadora runner={runner} setRunner={setRunner}/>}></Route>
        <Route path='/configuracion' element={<Configuracion runner={runner} setRunner={setRunner} font={font} setFont={setFont} theme={theme} setTheme={setTheme}/>}></Route>
        <Route path='/compartir' element={<Compartir runner={runner} setRunner={setRunner}/>}></Route>
        <Route path='*' element={<Nuevo runner={runner} setRunner={setRunner}/>}></Route>
    </Routes>
  )
}