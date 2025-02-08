import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dmSans: ['"DM Sans"', 'sans-serif'],
        nunitoSans: ['"Nunito Sans"', 'sans-serif'],
      },
      colors: {
        primary: "#68732F",
        primarybg: "#1C3319",
        primaryLightText: "#97A195",
        primaryLightText2: "#42526E",
        bgLight: "#E8EBE84D",
        bgLight2: "#D9D9D9",
        lighttext: "#7A7A7A",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow:{
        testShadow: "0px 0px 20px 0px #00000012",
        arrowShadow: "1px 3px 10px rgba(0, 0, 0, 0.5)",
        dateShadow: "-2px 2px 12px 0px #00000026",
      }
    },
  },
  plugins: [],
} satisfies Config;
