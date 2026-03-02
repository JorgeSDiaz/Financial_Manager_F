/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5c1c87',
          light: '#8b4dba',
          dark: '#3d1259',
        },
        secondary: '#f5f5f5',
        success: '#10b981',
        danger: '#ef4444',
        text: {
          primary: '#1f2937',
          secondary: '#6b7280',
        },
        background: '#ffffff',
        surface: '#f9fafb',
      },
    },
  },
  plugins: [],
}
