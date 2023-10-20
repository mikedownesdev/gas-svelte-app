import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'node_modules/zod/lib/index.js',
  output: {
    file: 'dist/server/lib/zod-bundle.js',
    format: 'iife',
    name: 'z',
  },
  plugins: [commonjs(), resolve()],
};
