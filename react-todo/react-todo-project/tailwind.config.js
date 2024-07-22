/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#03045E",

          secondary: "#ff9e00",

          accent: "#ff9100",

          neutral: "#00b4d8",

          "base-100": "#fff",

          info: "#0077b6",

          success: "#023e8a",

          warning: "#ff6d00",

          error: "#ff5400",
        },
      },
    ],
  },
  plugins: [daisyui],
};
