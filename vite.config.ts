import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

/*,
    devOptions: {
      enabled: true
    }
*/
export default defineConfig({
  plugins: [react(), VitePWA({ 
    //registerType: 'autoUpdate',
    
    workbox: {
      sourcemap:true,
      cleanupOutdatedCaches: true,
      //skipWaiting:true
    }
  })]
})
/*
registerType: 'autoUpdate' - nos permite actualizar automaticamente el nuevo registro de sw sin mas configuración es la mas usada y simple
workbox - este objeto nos sirve para manejar cada una de las diferentes configuraciones del service worker
  en nuestro caso con sourcemap: true y cleanupOutdatedCaches: true podemos hacer que actualize el registro y borre la cache 

En nuestro archio main: 
import { registerSW } from 'virtual:pwa-register' // esta linea se importa correctamente agregando /// <reference types="vite-plugin-pwa/client" />
al archivo de definicion de tipos vite-env-d.ts previene error de build

const updateSW = registerSW({
  onNeedRefresh() { // metodo que se ejecuta al detectar un nuevo service worker
    let res = window.confirm('Hay una version nueva, recargá para actualizar.');
    if(res){
      updateSW();
      location.reload();
    }
  },
  onOfflineReady() {},
})

*/