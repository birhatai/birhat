import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  // CRITICAL FIX: Use the provided key as a fallback if environment variables fail.
  // This prevents the "Black Screen" crash caused by undefined API Key.
  const apiKey = env.API_KEY || env.VITE_API_KEY || "AIzaSyBES_bpeKzfUmoSWWSaoIVQfmzrUAHQxxU";

  return {
    plugins: [react()],
    define: {
      // This ensures process.env.API_KEY is available in the browser code
      'process.env.API_KEY': JSON.stringify(apiKey)
    },
    build: {
      outDir: 'dist',
    }
  };
});