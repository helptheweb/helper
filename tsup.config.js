import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: true,
  splitting: false,
  globalName: 'AccessibilityHelper',
  outExtension({ format }) {
    return {
      js: `.${format}.js`
    }
  },
  platform: 'browser',
  target: ['es2015']
});