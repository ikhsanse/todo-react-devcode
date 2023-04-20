/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#16ABF8',
      secondary: '#F4F4F4',
      danger: '#ED4C5C',
      'white': '#ffffff',
      'gray1': '#888888',
      'black':'#000000'
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        '3': 'repeat(3, minmax(0, 235px))',
        '4': 'repeat(4, minmax(0, 235px))',

        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      }
    },
  },
  plugins: [],
}

