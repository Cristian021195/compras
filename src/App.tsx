import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, useLocation } from 'react-router-dom'
import './App.css'
import { PublicRouter } from './Router/PublicRouter'
import { Header } from './Components/Layout';
import { EditProvider } from './Context/EditContext'
import { locations } from './Utils'

function App() {
  const [runner, setRunner] = useState( locations.findIndex((lo)=>lo==='/nuevo') );
  const [font, setFont] = useState<string>(localStorage.getItem('font') || 'md');
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');
  const [bip, setBip] = useState<any>(undefined);
  const [close, setClose] = useState(false);

  useEffect(()=>{
    window.addEventListener('beforeinstallprompt', (event) => {
      setBip(event)
    });
  },[])

  useEffect(()=>{
    localStorage.setItem('font', font);
    document.body.className = '';
    document.body.classList.add('font-'+font);
  }
  ,[font])

  
  return (//<div id="top"></div>
      <BrowserRouter>
        <EditProvider>
          <div className={'main-height '+'theme-'+theme}>
            <div className={close ? 'd-none' : 'text-center mt-1'}>{bip !== undefined ? 
              <div className='d-flex justify-content-evenly gap-1 mx-1'>
                <div className='d-flex align-items-center'>¿Instalar app? Para una mejor experiencia</div>
                <button
                  onClick={async ()=>{
                      if(bip) bip.prompt();
                      const biip = await bip?.userChoice;
                      if (biip?.outcome){
                          if (biip?.outcome === 'accepted') {setBip(null)}
                      }
                  }} className='btn p-1 c-sgreen'>Instalar
                </button>
                <button className='btn p-1 c-ored' onClick={()=>{setClose(true)}}>Cerrar</button>
              </div> : <></> }
            </div>            
            <PublicRouter runner={runner} setRunner={setRunner} font={font} setFont={setFont} theme={theme} setTheme={setTheme}/>
            <Header runner={runner} setRunner={setRunner}></Header>
          </div>          
        </EditProvider>
      </BrowserRouter>
  )
}

export default App
