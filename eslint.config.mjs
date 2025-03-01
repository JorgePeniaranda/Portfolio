/**
 * @file ESLint configuration for an Astro + React project.
 * @description Defines linting rules and best practices for maintaining code quality,
 *              ensuring consistency, and enforcing accessibility and performance optimizations
 *              in a TypeScript-based Astro and React project.
 */

import { fixupPluginRules } from '@eslint/compat';
import astroParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginImport from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  /**
   * 🔹 Ignore paths that should not be linted
   */
  {
    ignores: [
      'node_modules',
      '.astro',
      '.github',
      'public',
      'docs',
      'coverage',
      '.idea',
      'src/env.d.ts',
    ],
  },

  /**
   * 🔹 General ESLint rules
   */
  {
    rules: {
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: ['return', 'export'] },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  /**
   * 🔹 React-specific ESLint rules
   */
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'react': fixupPluginRules(eslintPluginReact),
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
      'jsx-a11y': fixupPluginRules(eslintPluginJsxA11y),
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // ✅ Recommended rules
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginJsxA11y.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,

      // 🚀 Best practices
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'warn',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      'react-hooks/exhaustive-deps': 'warn',
      'react/no-array-index-key': 'warn',
      'react/no-unstable-nested-components': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
    },
  },

  /**
   * 🔹 TypeScript-specific ESLint rules
   */
  ...[
    ...tseslint.configs.recommended,
    {
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'after-used',
            ignoreRestSiblings: false,
            argsIgnorePattern: '^_.*?$',
          },
        ],
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      },
    },
  ],

  /**
   * 🔹 Prettier configuration
   */
  ...[
    eslintPluginPrettier,
    {
      rules: {
        'prettier/prettier': [
          'warn',
          // Same configuration as .prettierrc.mjs
          {
            plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
            tailwindFunctions: ['clsx', 'tw', 'twMerge', 'cn'],
            overrides: [
              {
                files: '*.astro',
                options: {
                  parser: 'astro',
                },
              },
            ],
            printWidth: 100,
            trailingComma: 'all',
            tabWidth: 2,
            semi: true,
            singleQuote: true,
            jsxSingleQuote: true,
            bracketSpacing: true,
            bracketSameLine: false,
            arrowParens: 'always',
            endOfLine: 'auto',
            quoteProps: 'consistent',
            proseWrap: 'always',
            htmlWhitespaceSensitivity: 'css',
            embeddedLanguageFormatting: 'auto',
          },
        ],
      },
    },
  ],

  /**
   * 🔹 Import management rules
   */
  {
    plugins: {
      import: fixupPluginRules(eslintPluginImport),
    },
    rules: {
      'import/no-default-export': 'off',
      'import/order': [
        'warn',
        {
          'groups': [
            'type',
            'builtin',
            'object',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'pathGroups': [{ pattern: '~/**', group: 'external', position: 'after' }],
          'newlines-between': 'always',
        },
      ],
    },
  },

  /**
   * 🔹 Astro-specific ESLint rules
   */
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
    plugins: { ...eslintPluginAstro.configs.recommended },
  },

  /**
   * 🔹 JSDoc configuration
   */
  jsdoc.configs['flat/recommended-typescript-error'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { jsdoc },
    rules: {
      'jsdoc/no-types': 'error',
      'jsdoc/require-description': 'warn',
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/check-line-alignment': 'warn',
      'jsdoc/require-throws': 'error',
      'jsdoc/require-jsdoc': [
        'off',
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
    },
  },
];
