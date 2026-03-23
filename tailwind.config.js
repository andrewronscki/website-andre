/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        devtools: {
          'color-scheme': 'dark',
          primary: '#EA2845',
          'primary-content': '#ffffff',
          secondary: '#1F2937',
          'secondary-content': '#f1f1f1',
          accent: '#EA2845',
          neutral: '#1a1a1f',
          'base-100': '#0E0E10',
          'base-200': '#1a1a1f',
          'base-300': '#222228',
          'base-content': '#f1f1f1',
          info: '#3b82f6',
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444',
        },
      },
    ],
    darkTheme: 'devtools',
    base: false,
    styled: true,
    utils: true,
    logs: false,
  },
};
