import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { PublicRouter } from './Router/PublicRouter'
import { Header } from './Components/Layout'
import { EditProvider } from './Context/EditContext'

function App() {
  const [font, setFont] = useState<string>(localStorage.getItem('font') || 'md');
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');
  const [bip, setBip] = useState<any>(undefined);
  const [close, setClose] = useState(false);

  useEffect(()=>{
    if(theme === 'dark'){
      document.body.style.backgroundColor = '#000000';
    }else{
      document.body.style.backgroundColor = '#ffffff';
    }
  },[theme]);

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
  
  return (
      <BrowserRouter>
        <EditProvider>
          <div className={'main-height '+'theme-'+theme}>
            <div className={close ? 'd-none' : 'text-center my-1'}>{bip !== undefined ? 
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
            <div className='principal'>
              <PublicRouter font={font} setFont={setFont} theme={theme} setTheme={setTheme}/>
            </div>
            <Header></Header>
          </div>          
        </EditProvider>
      </BrowserRouter>
  )
}

export default App
