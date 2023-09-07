import ROEditor from "../components/ReadOnlyEditor";

export default function ProjectFiles() {
    return (
        <div className="pagecont">
            <h1>Common Projec Files</h1>
            <div className="w-1/2 mx-auto">
                <p>The following files are common files or commands that I include in projects to make my time and experience more efficient.</p>
                <p>&nbsp;</p>

                <h2>Commands</h2>
                <p>Project Extras</p>
                <ROEditor height="h-8" defaultValue={`pnpm install -D autoprefixer postcss eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh`} />
                <ROEditor height="h-8" defaultValue={`pnpm install bootstrap-icons daisyui lodash tailwindcss theme-change ulidx`} />
                <p>&nbsp;</p>

                <h2>Files</h2>
                <ROEditor title=".eslintrc.cjs" defaultValue={`module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
}`} />
                <p>&nbsp;</p>
                <ROEditor title="prettier.config.js" defaultValue={`module.exports = {
    tabWidth: 4,
    semi: true,
    trailingComma: "es5",
    bracketSpacing: true,
    bracketSameLine: false,
}`} />
                <p>&nbsp;</p>
                <ROEditor title="tailwind.config.cjs" defaultValue={`module.exports = {
    content: ["./src/**/*.{html,css,js,jsx,ts,tsx}"],
    theme: {},
    plugins: [require('daisyui')],
    daisyui: {
        themes: ["light", "dark"]
    }
}`} />
                <p>&nbsp;</p>
                
                <h2>ViteJS</h2>
                <p>Run the common installation of ViteJS, then do any of the following steps for particular purposes:</p>
                <p>&nbsp;</p>

                <p className="font-bold">Single File Mode</p>
                <p>Run the following command using npm (single file mode in vite doesn't play well with pnpm):</p>
                <ROEditor height="h-8" defaultValue={`npm install -D vite-plugin-singlefile`} />
                <p>&nbsp;</p>

                <p>Then add the following to vite.config.js</p>
                <ROEditor title="vite.config.js" defaultValue={`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()]
})`} />
                <p>&nbsp;</p>

                <p className="font-bold">Proxy Forward (/api path)</p>
                <p>Add the following to vite.config.js:</p>
                <ROEditor title="vite.config.js" defaultValue={`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: false, // automatically open browser window
        port: 3000,
        https: {
            key: fs.readFileSync('./ssltls/key.pem'),
            cert: fs.readFileSync('./ssltls/cert.pem'),
        },
        proxy: {
            '/api': { 
                secure: false,
                target: "http://localhost:4000/",
                changeOrigin: true
            }
        }
    }
})`} />
                <p>&nbsp;</p>

                <p className="font-bold">AWS Amplify</p>
                <p>Add the following to a Vite project in order to allow the Amplify CLI to run the proxy server:</p>
                <ROEditor title="vite.config.js" defaultValue={`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      }
    }
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser'
    }
  }
})
`} />
                <p>&nbsp;</p>
            </div>
        </div>
    );
}