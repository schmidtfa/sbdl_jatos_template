# Vite migration kit for the thht/jatos_template

This adapts the original Webpack-based JATOS template to Vite 8, retaining its
`src/` versus `src_examples/` fallback and its existing JATOS ZIP generator.
The files are meant to be copied into the **project root**.

> This kit is adapted from the public GitLab template and the conversation's
> description of your modified jsPsych 8 setup. It has NOT been run against
> your modified local files or an installed Vite dependency tree.

## 1. Save working state

```bash
git status
git switch -c migrate-to-vite
```

## 2. Install Vite

```bash
npm install -D vite@^8
```

Keep your currently working TypeScript version initially; changing the TypeScript
compiler may cause additional warnings from the template's older ESLint parser.
If TypeScript reports it cannot parse a Vite declaration, we can upgrade
TypeScript and `@typescript-eslint` together in a separate step.

## 3. Copy the kit's files into the project root

Copy `vite.config.mjs`, `vite-entry.js`, `index.html`, and `vite-env.d.ts`.

## 4. Switch npm scripts without altering JATOS ZIP packaging

```bash
npm pkg set 'scripts.dev-server=vite' \
  'scripts.prod-server=vite preview' \
  'scripts.build=npm run lint && tsc --noEmit && vite build'
```

Keep `precreate_jatos_zip` (`npm run build`) and `create_jatos_zip`
(`node scripts/create_jatos_zip.mjs`) unchanged.

The original `scripts/run_eslint.js` automatically applies fixes while linting.
Review changes to source files after running `npm run build`.

## 5. Convert Webpack-style file imports

The public template has these CommonJS-style lines in `src_examples/audio_trials.ts`:

```ts
const snd_440 = require('./parts/assets/sounds/440.mp3');
const snd_550 = require('./parts/assets/sounds/550.mp3');
```

Replace with ESM imports:

```ts
import snd_440 from './parts/assets/sounds/440.mp3';
import snd_550 from './parts/assets/sounds/550.mp3';
```

`vite-env.d.ts` provides TypeScript declarations for Vite-supported assets.
Search your own source code for more Webpack-specific uses of `require()`,
`process.env`, and `__dirname` (Vite does not provide the same polyfills).

## 6. Check the local study

```bash
npm run dev-server
```

Open http://localhost:8080/ then choose a study component. During development
links use `index.html?component=audio_trials` (for example). During export,
real `audio_trials.html` and other component HTML files are generated automatically.

## 7. Production / JATOS test

```bash
npm run build
ls dist/*.html
npm run create_jatos_zip
unzip -t jatos.zip
unzip -Z -1 jatos.zip | head -n 30
```

Import the ZIP into a **new test study**, then verify experiments, data storage,
media URLs, and JATOS component progression. The on-server `jatos.js` is injected
into production HTML by the Vite build hook. The local dev server intentionally
omits it, so jsPsych can run outside JATOS.

If your current JATOS integration in `lib/jatos.ts` is working, do not rewrite
it as part of the bundler migration.

## 8. Remove Webpack-only dependencies AFTER verification

```bash
npm uninstall -D \
  webpack webpack-cli webpack-dev-server webpack-merge \
  webpack-bundle-analyzer terser-webpack-plugin \
  babel-loader ts-loader css-loader style-loader sass-loader \
  file-loader html-loader html-webpack-plugin \
  html-webpack-tags-plugin clean-webpack-plugin
```

Also remove unused Babel dependencies from your package ONLY if you do not
use Babel elsewhere. Keep `archiver`, `glob`, `fs-extra`, and `uuid`, which the
existing JATOS ZIP generator uses; keep `sass` if your studies use SCSS.

The old `webpack.*.js`, `wp_src/`, and `html_templates/` files can be deleted
once the Vite import has been verified. Never delete `lib/jatos.ts` or the ZIP
packaging script.

## Notes

- `base: './'` is essential to make generated assets work from JATOS's nested URLs.
- Generated `dist/<component>.html` pages all include the same loader; each
  filename selects the corresponding source module.
- The production HTML refers to `/assets/javascripts/jatos.js`, as the
  original Webpack template did. Running `vite preview` without JATOS can cause
  a harmless 404 for that server-provided script.
- Vite's `import.meta.glob()` lazily bundles component modules, so each page
  loads only the component it needs.
- Adding, deleting, or renaming a top-level study component changes the
  generated HTML page list; restart the dev server after adding new files.
