import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    /*let res = window.confirm('Hay una version nueva, 𝗿𝗲𝗰𝗮𝗿𝗴𝗮́ para actualizar.');
    if(res){
      updateSW();
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === false){
        location.reload();
      }
      //asd
      //location.reload();
      //let $recarga = document.getElementById('recarga')!;
      //$recarga?.click();
    }*/
    updateSW();
    alert('Hay una version nueva, 𝗿𝗲𝗰𝗮𝗿𝗴𝗮𝗿 para actualizar.');
  },
  onOfflineReady() {},
})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
