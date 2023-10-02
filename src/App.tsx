import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, useLocation } from 'react-router-dom'
import './App.css'
import { PublicRouter } from './Router/PublicRouter'
import { Header } from './Components/Layout';
import { EditProvider } from './Context/EditContext'
import { locations } from './Utils'

function App() {
  const [runner, setRunner] = useState( locations.findIndex((lo)=>lo===window.location.pathname) );
  const [font, setFont] = useState<string>(localStorage.getItem('font') || 'md');

  useEffect(()=>{
    localStorage.setItem('font', font);
    document.body.className = '';
    document.body.classList.add('font-'+font);
  }
  ,[font])

  
  return (
      <BrowserRouter>
        <EditProvider>
          <div id="top"></div>
          <Header runner={runner} setRunner={setRunner}></Header>
          <PublicRouter runner={runner} setRunner={setRunner} font={font} setFont={setFont}/>
          <a href="#top" className='no-select' style={{backgroundColor:'rgba(255,127,80,0.7)', color:'whitesmoke', padding:'1em', width:'1em',height:'1em', borderRadius:'50%', textDecoration:'none', position:'fixed', bottom:'1em', right:'1em'}}>▲</a>
          <div style={{height:'2em'}}>&nbsp;</div>
        </EditProvider>
      </BrowserRouter>
  )
}

export default App
