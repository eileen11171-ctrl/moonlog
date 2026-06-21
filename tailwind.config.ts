import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        moon: {
          cream: "#FAF8F3",
          paper: "#FCFCFA",
          sky: "#C9DDEA",
          lav: "#CFC7E8",
          mist: "#D7D5D0",
          ink: "#4F5968",
          shadow: "#A7A2AE",
        },
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', "serif"],
        sans: ['"Noto Sans TC"', "sans-serif"],
        fraunces: ['"Fraunces"', "serif"],
      },
      borderRadius: { soft: "1.5rem", card: "2rem" },
      boxShadow: {
        card: "0 18px 50px -28px rgba(79,89,104,.45), 0 2px 10px rgba(79,89,104,.04)",
        group: "0 10px 30px -26px rgba(79,89,104,.4)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-9px)" } },
        breathe: { "0%,100%": { opacity: ".55" }, "50%": { opacity: ".9" } },
        rise: { to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        float: "float 7.5s ease-in-out infinite",
        breathe: "breathe 7s ease-in-out infinite",
        rise: "rise .9s cubic-bezier(.2,.7,.3,1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
