module.exports = {
  content: ["./dist/index.html", "./src/index.js"],
  theme: {
    extend: {
      fontFamily: {
        'Catamaran': ["Catamaran", "sans"]
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class',
}
