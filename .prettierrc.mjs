/** @type {import("prettier").Config} */
export default {
  arrowParens: 'avoid',
  printWidth: 80,
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.mjs',
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
