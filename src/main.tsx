import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
const $update_bar = document.getElementById('update-bar');
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
    
    $update_bar!.className = 'update-bar d-flex justify-content-center align-items-center';
    $update_bar!.innerHTML = `<div class="d-flex justify-content-center p-2 text-w">
      <h4 class="m-0"><b class="d-flex align-items-center">¡Hay una nueva versión! Actualizando: 
      <span class="ms-2">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="1.5rem" height="1.5rem" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <circle xmlns="http://www.w3.org/2000/svg" cx="50" cy="50" fill="none" stroke="whitesmoke" stroke-width="16" r="37" stroke-dasharray="174.35839227423352 60.119464091411174">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.4s" values="0 50 50;360 50 50" keyTimes="0;1"/>
          </circle>
        </svg>
      </span>
      </b></h4>
    </div>`;
    setTimeout(() => {
      $update_bar!.remove();
      updateSW();  
    }, 3000);
  },
  onOfflineReady() {
  },
})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
