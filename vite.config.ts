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
    //registerType: 'autoUpdate'
    
    workbox: {
      sourcemap:true,
      cleanupOutdatedCaches: true,
      skipWaiting:true
    }
  })]
})
