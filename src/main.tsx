import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
const $update_bar = document.getElementById('update-bar');//comentario
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
    $update_bar!.className = 'update-bar';
    $update_bar!.innerHTML = "<div style='padding-right:1rem'><p>Hay una version nueva, actualizando...</p></div>";
    setTimeout(() => {
      $update_bar!.remove();
      updateSW();  
    }, 3000);
    
    /*let res = window.confirm('Hay una version nueva, 𝗿𝗲𝗰𝗮𝗿𝗴𝗮́ para actualizar.');
    if(res){
      updateSW();  
    }*/
    //alert('Hay una version nueva, 𝗿𝗲𝗰𝗮𝗿𝗴𝗮𝗿 para actualizar.');
    //updateSW();
    
  },
  onOfflineReady() {
  },
})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
