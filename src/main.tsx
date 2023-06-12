import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    let res = window.confirm('Hay una version nueva, recargá para actualizar.');
    if(res){
      updateSW();
      //location.reload();
      let $recarga = document.getElementById('recarga')!;
      $recarga?.click();
    }
  },
  onOfflineReady() {},
})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
