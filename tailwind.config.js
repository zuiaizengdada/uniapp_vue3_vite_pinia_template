/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts,tsx,html,js}', '!./src/**/__tests__/*', '!./node_modules/**'],
  important: true,
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'scale(0.8)'
          },
          to: {
            opacity: '1',
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease'
      }
    }
  }
}
