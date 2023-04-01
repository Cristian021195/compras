import {useState} from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { HeadTitleUrl } from '../Helpers'
import { Contacto, Inicio, Nuevo } from '../Pages'
/*import { Configuracion } from '../Pages/Configuracion'
import { Contacto } from '../Pages/Contacto'
import { Escritos } from '../Pages/Escritos'
import { Inicio } from '../Pages/Inicio'
import { OtrosAutores } from '../Pages/OtrosAutores'
import {HeadTitleUrl} from '../Helpers/HeadTitleUrl';
import { EscritoSingular } from '../Components/EscritoSingular'
import { Nuevo } from '../Pages/Nuevo'*/

export const PublicRouter = () => {
  const location = useLocation()
  HeadTitleUrl(location.pathname, 'Lista Compras');
  const [runner, setRunner] = useState(0);
  return (
    <Routes>
        <Route index element={<Inicio runner={runner} setRunner={setRunner}/>}></Route>
        <Route path='/inicio' element={<Inicio runner={runner} setRunner={setRunner}/>}></Route>
        <Route path='/nuevo' element={<Nuevo runner={runner} setRunner={setRunner}/>}></Route>
        <Route path='/contacto' element={<Contacto runner={runner} setRunner={setRunner}/>}></Route>
    </Routes>
  )
}

/*


        <Route path='/escritos' element={<Escritos/>}></Route>
        <Route path='/escritos/:id' element={<EscritoSingular/>}></Route>
        <Route path='/otros' element={<OtrosAutores/>}></Route>
        <Route path='/configuracion' element={<Configuracion/>}></Route>
        <Route path='/contacto' element={<Contacto/>}></Route>
        <Route path='/nuevo' element={<Nuevo/>}></Route>

*/