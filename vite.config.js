import reactRefresh from '@vitejs/plugin-react-refresh';
import shimReactPdf from "vite-plugin-shim-react-pdf";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import path from 'path';
import fs from 'fs';


/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
    plugins: [reactRefresh(), shimReactPdf()],
    resolve: {
        alias: [
            {
                find: /^@mui\/icons-material\/(.*)/,
                replacement: '@mui/icons-material/esm/$1',
            },
        ],
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    process: true,
                    buffer: true
                })
            ]
        }
    },
    server: {
        port: 3000,
    },
    define: { 'process.env': {} },
};
