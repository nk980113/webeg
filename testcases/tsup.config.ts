import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./!(node_modules)/*.tsx'],
  noExternal: [/^webeg.*/],
  format: 'esm',
  sourcemap: true,
});
