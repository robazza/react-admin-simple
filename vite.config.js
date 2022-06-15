import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import fs from 'fs';


/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
    plugins: [reactRefresh()],
    resolve: {
        alias: [
            {
                find: /^@mui\/icons-material\/(.*)/,
                replacement: '@mui/icons-material/esm/$1',
            },
        ],
    },
    server: {
        port: 3000,
    },
    define: { 'process.env': {} },
};
