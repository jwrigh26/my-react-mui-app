import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { getDefineObject } from './config/env.config';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        fastRefresh: true,
      }),
    ],
    esbuild: false, // Disabling esbuild, since we'll be using swc
    swc: {
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      // Additional SWC options can be provided here as needed.
    },
    // Define env variables based on the .env file or process.env
    define: getDefineObject(env),
    server: {
      historyApiFallback: true,
      port: 5173, // Use this port if available, or the next free one
    },
    build: {
      emptyOutDir: true,
      sourcemap: true,
      minify: true,
      rollupOptions: {
        input: './index.html',
        output: {
          dir: 'build',
        },
      },
      target: 'es2018',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
        data: path.resolve(__dirname, 'src/data'),
        features: path.resolve(__dirname, 'src/features'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        layouts: path.resolve(__dirname, 'src/layouts'),
        lib: path.resolve(__dirname, 'src/lib'),
        pages: path.resolve(__dirname, 'src/pages'),
        providers: path.resolve(__dirname, 'src/providers'),
        router: path.resolve(__dirname, 'src/router'),
        services: path.resolve(__dirname, 'src/services'),
        src: path.resolve(__dirname, 'src'),
        styles: path.resolve(__dirname, 'src/styles'),
        utils: path.resolve(__dirname, 'src/utils'),
        React: path.resolve(__dirname, 'node_modules/react/'),
      },
    },
  };
});
