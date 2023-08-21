import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile';
import { svelte } from '@sveltejs/vite-plugin-svelte'
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    viteSingleFile(),

    // Delete the dist/server directory before each build
    del({ targets: 'dist/server/*' }),
    copy({
      targets: [
        { src: 'src/server', dest: 'dist' }
      ],
      flatten: false,
    }),
    copy({
      targets: [
        { src: 'src/types', dest: 'dist' }
      ],
      flatten: false,
    }),
  ],
  build: {
    minify: true,
    outDir: resolve(__dirname, 'dist/client'),
  },
})
