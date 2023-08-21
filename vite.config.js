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

    // Delete the dist/ directory before each build
    del({ targets: 'dist/*' }),
    copy({
      targets: [
        { src: 'src/appsscript.json', dest: 'dist' },
      ]
    }),
    copy({
      targets: [
        { src: 'src/types', dest: 'dist' },
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
