/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
        },
        neutral: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        brand: {
          charcoalBlack: '#2B2B25',
          creamWhite: '#F2EEDB',
          oliveGreen: '#7B8448',
          earthBrown: '#5F4528',
          safetyOrange: '#F97924',
          steelBlue: '#4A6B8A',
          shadedGreen: '#646C36',
          pureWhite: '#FFFFFF',
        },
        'cream-sky': '#FAF8F0',
        'soft-blue-sky': '#D6EAF8',
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-mohave)', 'sans-serif'],
      },
      screens: {
        xs: '475px',
      },
      spacing: {
        'xs': '4px',
        's': '8px',
        'm': '16px',
        'l': '32px',
        'xl': '64px',
      },
      borderRadius: {
        'DEFAULT': '12px',
        'lg': '12px',
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
