import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['cjs', 'esm'],
  splitting: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  shims: true,
  dts: true,
  external: ['react'],
});
