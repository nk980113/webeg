import { defineConfig } from 'tsup';

export default defineConfig({
  target: 'es2022',
  entry: {
    index: 'src/index.ts',
    'jsx-runtime': 'src/jsx-runtime.ts',
  },
  format: ['esm'],
  dts: true,
});
