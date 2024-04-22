import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { PublicRouter } from './Router/PublicRouter'
import { Header } from './Components/Layout'
import { EditProvider } from './Context/EditContext'
import { ZConfig,ZMainForm } from './Store'

function App() {
  const {theme, font} = ZConfig((state)=>state);
  const [bip, setBip] = useState<any>(undefined);
  const [close, setClose] = useState(false);

  useEffect(()=>{
    window.addEventListener('beforeinstallprompt', (event) => {
      setBip(event)
    });
  },[])
    
  return (
      <BrowserRouter>
        <EditProvider>
          <div className={'main-height '+'theme-'+theme}>
            <div className={close ? 'd-none' : 'd-none text-center py-1 bip-bar p-abs'}>{bip !== undefined ? 
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
              <PublicRouter font={font} theme={theme}/>
            </div>
            <Header></Header>
          </div>          
        </EditProvider>
      </BrowserRouter>
  )
}

export default App
