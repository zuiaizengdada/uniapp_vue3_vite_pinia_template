/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkMode: 'class',
  content: ['./index.html', '!./src/**/__tests__/*', './src/**/*.{vue,ts,tsx}'],
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
        },
        slideInRight: {
          from: {
            transform: 'translateX(100%)'
          },
          to: {
            transform: 'translateX(0)'
          }
        },
        slideInLeft: {
          from: {
            transform: 'translateX(-100%)'
          },
          to: {
            transform: 'translateX(0)'
          }
        },
        slideOutRight: {
          from: {
            transform: 'translateX(0)'
          },
          to: {
            transform: 'translateX(100%)'
          }
        },
        slideOutLeft: {
          from: {
            transform: 'translateX(0)'
          },
          to: {
            transform: 'translateX(-100%)'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease',
        slideInRight: 'slideInRight 0.3s ease-in-out',
        slideInLeft: 'slideInLeft 0.3s ease-in-out',
        slideOutRight: 'slideOutRight 0.3s ease-in-out',
        slideOutLeft: 'slideOutLeft 0.3s ease-in-out'
      }
    }
  }
}
