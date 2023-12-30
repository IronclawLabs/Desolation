import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.ANCHOR_BROWSER': true
},
  plugins: [react(), tsconfigPaths(), commonjs()],
})
