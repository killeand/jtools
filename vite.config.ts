import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteSingleFile()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: './docs',
        emptyOutDir: true,
    },
});
