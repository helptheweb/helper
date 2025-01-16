import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  dts: true,
  clean: true,
  minify: true,
  globalName: 'AccessibilityHelper',
  outExtension({ format }) {
    return {
      js: format === 'iife' ? '.browser.js' : format === 'esm' ? '.mjs' : '.js',
    }
  }
})