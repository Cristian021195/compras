import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { HeadTitleUrl } from '../Helpers'
import { Contacto, Inicio, Nuevo } from '../Pages'
import { IRouter } from '../Interfaces'

export const PublicRouter = ({runner, setRunner, font, setFont}:IRouter) => {
  const location = useLocation()
  HeadTitleUrl(location.pathname, 'Lista Compras');
  
  return (
    <Routes>        
        <Route path='/' element={<Inicio runner={runner} setRunner={setRunner} font={font} setFont={setFont}/>}></Route>
        <Route path='/nuevo' element={<Nuevo runner={runner} setRunner={setRunner}/>}></Route>
        <Route path='/contacto' element={<Contacto runner={runner} setRunner={setRunner}/>}></Route>
        <Route path='*' element={<Inicio runner={runner} setRunner={setRunner} font={font} setFont={setFont}/>}></Route>
    </Routes>
  )
}