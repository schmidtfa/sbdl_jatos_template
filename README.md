# jsPsych + Vite + JATOS Study Template

A template for developing and deploying browser-based behavioral experiments with [jsPsych 8](https://www.jspsych.org/v8/), [Vite](https://vite.dev/), and [JATOS](https://www.jatos.org/).

Write experiments as small, reusable JavaScript or TypeScript modules. Run individual study components locally, then build and package the complete study for import into JATOS.

## Features

- JavaScript and TypeScript experiment components
- Fast local development with Vite
- Automatic discovery of study components
- Shared helpers and custom jsPsych plugins
- Imports for images, audio, styles, and HTML stimuli
- Production builds and JATOS study ZIP generation
- ESLint and TypeScript checks

## Requirements

- A Node.js version supported by your installed Vite version, and npm
- Git (if cloning or contributing to the repository)
- Access to a JATOS installation for deployment and end-to-end testing

## Getting started

Clone this GitHub repository (or your own fork) and install dependencies:

```bash
git clone <your-github-repository-url>
cd <repository-directory>
npm install
```

Start the development server:

```bash
npm run dev-server
```

Open <http://127.0.0.1:8080/> to see the available example components. To open one directly, use a URL such as:

```text
http://127.0.0.1:8080/index.html?component=visual_trials
```

The development server listens on your own computer. Stop it with `Ctrl+C`.

## Project structure

```text
lib/                 jsPsych/JATOS integration
scripts/             Study packaging utilities
src_examples/        Ready-to-run example components and helpers
src/                 Your own study components (optional)
public/              Static assets, if needed
index.html           App HTML entry
vite-entry.js        Component discovery and loading
vite.config.mjs      Development and production configuration
vite-env.d.ts        Vite asset import types
tsconfig.json        TypeScript settings
eslint.config.mjs    ESLint settings
package.json         Project metadata and npm scripts
```

### Study components

A JATOS study consists of **components** that can run in sequence. In this template, each top-level `.js`, `.jsx`, `.ts`, or `.tsx` file in the active source directory defines a component. Put reusable code in subdirectories such as `parts/` and `plugins/`.

For example, a `visual_trials.ts` component might look like this:

```typescript
import { initJsPsychWithJatos } from '../lib/jatos.ts';
import get_images_trials from './parts/show_images.js';

const jsPsych = initJsPsychWithJatos();

jsPsych.run([
  get_images_trials(jsPsych, 10),
]);
```

The `initJsPsychWithJatos()` helper initializes jsPsych with the project's JATOS integration. You can explore the components, helpers, and custom plugin in `src_examples/`.

### Create your own study

1. Set a meaningful package name in `package.json`, for example:

   ```bash
   npm pkg set name=my-auditory-study
   ```

2. Create a `src/` directory and add one top-level entry file for each JATOS component. The directory must contain at least one component.
3. Organize shared logic and media assets in subdirectories.

When `src/` exists, the development and build configuration uses it instead of `src_examples/`. You can leave `src_examples/` in place for reference.

### Import assets

Vite handles image and audio imports:

```javascript
import sound from './parts/assets/sounds/440.mp3';
import image from './parts/assets/images/correct.png';
```

To import an HTML fragment as a **string**, for instance as a jsPsych instruction stimulus, append `?raw`:

```javascript
import instructions from './parts/assets/instructions/instructions.html?raw';
```

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev-server` | Start the local development server |
| `npm run lint` | Check source code without modifying it |
| `npm run lint-fix` | Automatically fix supported ESLint findings |
| `npx tsc --noEmit` | Type-check the project |
| `npm run build` | Lint, type-check, and build into `dist/` |
| `npm run prod-server` | Preview the production build locally |
| `npm run create_jatos_zip` | Build and package the study for JATOS |

## Deploy to JATOS

First, make sure `package.json` contains your study's actual name, rather than the template placeholder.

Then run:

```bash
npm run create_jatos_zip
```

The packaging command builds the project and creates `jatos.zip` in the repository root. Import that archive through your JATOS instance's study import interface.

**Test the imported study in JATOS before collecting participant data.** In particular, verify that all components load, media assets play or display correctly, results are saved, and the study advances between components. Local development runs outside JATOS and cannot verify the complete server integration.

## Maintenance

Use `npm outdated` or `npx npm-check-updates` to review dependency updates. Check compatibility before accepting major-version changes, and rerun both the local build and JATOS deployment tests after upgrading dependencies.

## Acknowledgments

This repository is a new version built on the original [**thht/jatos_template**](https://gitlab.com/thht/jatos_template). Thanks Thomas Hartmann for providing the foundation and component-based approach on which this template builds and for your support in setting this up. OpenAI's ChatGPT was used to transition from the old to the new version of the JATOS Study Template.

## Documentation

- [jsPsych 8 documentation](https://www.jspsych.org/v8/)
- [Vite documentation](https://vite.dev/guide/)
- [JATOS documentation](https://www.jatos.org/)
