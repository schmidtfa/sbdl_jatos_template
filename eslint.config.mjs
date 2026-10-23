import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default defineConfig([
  // Ignore generated and external files.
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'public/**',
      'coverage/**',
    ],
  },

  // Recommended rules for JavaScript and TypeScript.
  {
    files: ['**/*.{js,jsx,cjs,mjs,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
  },

  // Browser-side experiment code.
  {
    files: [
      'src/**/*.{js,jsx,ts,tsx}',
      'src_examples/**/*.{js,jsx,ts,tsx}',
      'lib/**/*.{js,jsx,ts,tsx}',
      'vite-entry.js',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        jatos: 'readonly',
        jsPsych: 'readonly',
      },
    },
  },

  // Build configuration and Node.js scripts.
  {
    files: [
      'scripts/**/*.{js,cjs,mjs}',
      'vite.config.mjs',
      'eslint.config.mjs',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
]);