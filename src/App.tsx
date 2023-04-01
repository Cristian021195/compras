import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { PublicRouter } from './Router/PublicRouter'
import { Header } from './Components/Layout';
import { EditProvider } from './Context/EditContext'
//import { useSlideRouter } from './Hooks'

function App() {  
  //const {pos1, pos2, setPos1, setPos2} = useSlideRouter(window.location.pathname)
  return (    
      <BrowserRouter>
        <EditProvider>
          <div id="top"></div>
          <Header></Header>
          <PublicRouter/>
          <a href="#top" style={{backgroundColor:'rgba(255,127,80,0.7)', color:'whitesmoke', padding:'1em', width:'1em',height:'1em', borderRadius:'50%', textDecoration:'none', position:'fixed', bottom:'1em', right:'1em'}}>▲</a>
          <div style={{height:'2em'}}>&nbsp;</div>
        </EditProvider>
      </BrowserRouter>
  )
}

export default App
