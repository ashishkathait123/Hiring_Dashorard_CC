/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
      'custom-image': "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgLYIN269d6i0QOwQdFpWRvxJdzCJ_nvf_Eg&s')",
        
      }
    },

  },
  plugins: [], 
};
 