import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile';
import { svelte } from '@sveltejs/vite-plugin-svelte'
import copy from 'rollup-plugin-copy';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    viteSingleFile(),
    copy({
      targets: [
          { src: 'src/server', dest: 'dist' }
      ],
      flatten: false,
  }),
  ],
  build: {
    minify: true,
    outDir: resolve(__dirname, 'dist/client'),
  },
})
