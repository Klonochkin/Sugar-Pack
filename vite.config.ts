import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { join } from 'node:path';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    root: './src',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        target: browserslistToEsbuild(),
        cssTarget: browserslistToEsbuild(),
    },
    resolve: {
        alias: {
            '@': join(import.meta.dirname, './src'),
        },
    },
    css: {
        postcss: {
            plugins: [tailwind, autoprefixer],
        },
    },
});
