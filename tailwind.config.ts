import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: '#C8B18A',
          50: '#FBF9F5',
          100: '#F5EFE5',
          200: '#EADEC9',
          300: '#DFCCA9',
          400: '#D4BD95',
          500: '#C8B18A', // Sophisticated Champagne Beige
          600: '#B59E75',
          700: '#94815C',
          800: '#756648',
          900: '#5A4F38',
        },
        gold: {
          50: '#FBF9F5',
          100: '#F5EFE5',
          200: '#EADEC9',
          300: '#DFCCA9',
          400: '#D4BD95',
          500: '#C8B18A', // Aligned with elegant champagne beige
          600: '#B59E75',
          700: '#94815C',
          800: '#756648',
          900: '#5A4F38',
        },
      },
      fontFamily: {
        cairo: ['var(--font-cairo)', 'Cairo', 'sans-serif'],
        ibm: ['var(--font-ibm)', 'IBM Plex Sans Arabic', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 4px 20px -2px rgba(200, 177, 138, 0.25)',
        'gold-lg': '0 10px 30px -4px rgba(200, 177, 138, 0.35)',
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
      },
    },
  },
  plugins: [],
};
export default config;
