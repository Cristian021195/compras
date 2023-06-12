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
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  },
  onOfflineReady() {},
})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
