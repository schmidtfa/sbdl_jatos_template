import { copyFileSync, existsSync, readdirSync } from 'node:fs';
import { parse, resolve } from 'node:path';
import { defineConfig } from 'vite';

const projectRoot = process.cwd();
const sourceFolder = existsSync(resolve(projectRoot, 'src'))
  ? 'src'
  : 'src_examples';
const sourcePath = resolve(projectRoot, sourceFolder);

// Preserve the template's convention: every top-level JS/TS file is a JATOS component.
const componentNames = readdirSync(sourcePath, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(js|jsx|ts|tsx)$/.test(entry.name))
  .map((entry) => parse(entry.name).name);

if (componentNames.length === 0) {
  throw new Error(`No JATOS components found in ${sourceFolder}`);
}
if (new Set(componentNames).size !== componentNames.length) {
  throw new Error(`Duplicate component names in ${sourceFolder}`);
}

export default defineConfig(({ command }) => ({
  base: './', // JATOS hosts study assets under a study-specific URL.
  resolve: {
    alias: {
      '@components': sourcePath,
    },
  },
  server: {
    host: '127.0.0.1',
    port: 8080,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  plugins: [
    {
      name: 'jatos-study-components',
      transformIndexHtml: {
        order: 'post',
        handler(html) {
  if (command !== 'build') return html;

  return html.replace(
    '</head>',
    '  <script src="jatos.js"></script>\n</head>',
  );
},
      },
      writeBundle() {
        // All component HTML files refer to the same loader; the loader selects
        // the component based on the name of the HTML file at runtime.
        const indexHtml = resolve(projectRoot, 'dist', 'index.html');
        for (const componentName of componentNames) {
          copyFileSync(
            indexHtml,
            resolve(projectRoot, 'dist', `${componentName}.html`),
          );
        }
      },
    },
  ],
}));
