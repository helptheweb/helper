import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  dts: true,
  minify: true,
  clean: true,
  globalName: 'AccessibilityHelper',
  platform: 'browser',
  target: 'es2015',
  outDir: 'dist',
  outExtension({ format }) {
    return {
      js: format === 'iife' ? `.min.js` : `.${format}.js`
    }
  }
})