import js from '@eslint/js'
import globals from 'globals'
import vuePlugin from 'eslint-plugin-vue'
import prettierConfig from 'eslint-plugin-prettier/recommended'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default [
  // 基础环境和规则
  js.configs.recommended,
  {
    ignores: ['node_modules/**', 'dist/**', '.eslintignore', 'src/uni_modules/**', 'src/components/ua-markdown/**'],
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    languageOptions: {
      globals: {
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 2020
      }
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-undef': 'off'
    }
  },
  // TypeScript 规则
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescriptPlugin
    },
    languageOptions: {
      parser: typescriptParser
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
  },
  // Vue 规则
  {
    files: ['**/*.vue'],
    plugins: {
      vue: vuePlugin
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      ...vuePlugin.configs.essential.rules,
      'vue/multi-word-component-names': 'off'
    }
  },
  // 统一使用 Prettier
  {
    ...prettierConfig,
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 200,
          singleQuote: true,
          semi: false,
          trailingComma: 'none'
        }
      ]
    }
  }
]
