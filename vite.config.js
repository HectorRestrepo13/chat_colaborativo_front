import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {                       // Ruta que debe interceptar
        target: 'http://localhost:3000', // Dirección del backend
        changeOrigin: true,             // Cambia el origen de la solicitud para evitar CORS
        secure: false,                  // Ignora certificados si es una conexión HTTPS no segura
        rewrite: (path) => path.replace(/^\/api/, '/api') // Ajusta la URL si es necesario
      }
    }
  }
});
