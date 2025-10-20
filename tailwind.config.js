/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'cream': '#F9F8F7',
        'light-beige': '#EDEAE4',
        'gray-blue': '#ADB8BB',
        'dark-blue': '#153147',
        'charcoal': '#232A2F',
      },
    },
  },
  plugins: [],
}
