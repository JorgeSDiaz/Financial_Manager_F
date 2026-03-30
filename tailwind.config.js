/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5c1c87',
          50:  '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#8b4dba',
          700: '#5c1c87',
          800: '#3d1259',
          900: '#2e0f42',
          950: '#1a0826',
        },
        secondary: '#f5f5f5',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        background: '#ffffff',
        surface: '#f9fafb',
        card: '#ffffff',
        'card-border': '#f3f4f6',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.3s ease-out forwards',
      },
      gridAutoRows: {
        'card': 'minmax(80px, auto)',
      },
    },
  },
  plugins: [],
}
