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
          safetyOrangeDarker: '#F5711A',
          steelBlue: '#4A6B8A',
          shadedGreen: '#646C36',
          pureWhite: '#FFFFFF',
          brandCream: '#F2EEDB',
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
        'arrow-move': 'arrow-move 0.8s ease-out infinite',
        'subtle-glow': 'subtle-glow 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'arrow-move': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(3px)' },
        },
        'subtle-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(239, 68, 68, 0.1), 0 0 10px rgba(239, 68, 68, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 8px rgba(239, 68, 68, 0.7), 0 0 15px rgba(239, 68, 68, 0.5)',
          },
        },
      },
      boxShadow: {
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'inner-md': 'inset 0 4px 6px 0 rgba(0,0,0,0.1)',
        'none': 'none',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
