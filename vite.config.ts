import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {codeInspectorPlugin} from 'code-inspector-plugin';
import fs from 'node:fs';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

type DemoFile = {
  name: string;
  title: string;
  url: string;
};

function demoPreviewPlugin(): Plugin {
  const demosDirectory = path.resolve(__dirname, 'demos');

  const getDemoFiles = (): DemoFile[] => {
    if (!fs.existsSync(demosDirectory)) return [];

    return fs.readdirSync(demosDirectory, {withFileTypes: true})
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.html'))
      .map((entry) => ({
        name: entry.name,
        title: entry.name
          .replace(/\.html$/i, '')
          .replace(/[_-]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
        url: `/demos/${encodeURIComponent(entry.name)}`,
      }))
      .sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
  };

  return {
    name: 'demo-preview',
    configureServer(server) {
      server.middlewares.use('/demos', (request, response, next) => {
        const requestPath = request.url?.split('?')[0] ?? '/';
        if (requestPath === '/manifest.json') {
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.end(JSON.stringify(getDemoFiles()));
          return;
        }

        let fileName: string;
        try {
          fileName = decodeURIComponent(requestPath.replace(/^\//, ''));
        } catch {
          response.statusCode = 400;
          response.end('Invalid demo path');
          return;
        }

        if (!getDemoFiles().some((demo) => demo.name === fileName)) {
          next();
          return;
        }

        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        fs.createReadStream(path.join(demosDirectory, fileName)).pipe(response);
      });
    },
    buildStart() {
      const demos = getDemoFiles();
      for (const demo of demos) {
        this.emitFile({
          type: 'asset',
          fileName: `demos/${demo.name}`,
          source: fs.readFileSync(path.join(demosDirectory, demo.name)),
        });
      }
      this.emitFile({
        type: 'asset',
        fileName: 'demos/manifest.json',
        source: JSON.stringify(demos),
      });
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), codeInspectorPlugin({bundler: 'vite'}), demoPreviewPlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://192.168.3.15:8001',
          changeOrigin: true,
        },
      },
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
