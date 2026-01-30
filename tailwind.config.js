/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: {
          bg: '#f8f9fa',
          card: '#ffffff',
          border: '#e5e7eb',
        },
        copilot: {
          bg: '#fafbfc',
          accent: '#2563eb',
        },
        badge: {
          high: '#16a34a',
        },
        action: {
          primary: '#2563eb',
          hover: '#1d4ed8',
        }
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.08)',
        elevated: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}

