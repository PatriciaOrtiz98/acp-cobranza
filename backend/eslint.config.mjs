// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 1. Ignora archivos de configuración para evitar bucles de verificación
  {
    ignores: ['eslint.config.mjs'],
  },

  // 2. Habilita las configuraciones recomendadas de ESLint y TypeScript
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // 3. Habilita las reglas de ESLint para Prettier
  eslintPluginPrettierRecommended,

  // 4. Define las opciones de lenguaje, como los entornos y el parser de TypeScript
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // 5. Configura reglas específicas para tu proyecto
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
    },
  },
);
