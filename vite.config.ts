import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig, PluginOption } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss() as PluginOption, viteSingleFile()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
