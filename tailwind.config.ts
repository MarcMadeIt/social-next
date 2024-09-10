import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        text: "var(--text)",
        primary:"var(--primary)",
        secondary:"var(--secondary)",
        placeholder:"var(--placeholder)",
        shadow:"var(--shadow)",
        extra:"var(--extra)",
        user:"var(--user)",
        dark:"var(--dark)",
        fade: "var(--fade)",
        hover: "var(--hover)"
      },
      fontFamily: {
        sans: ["Kanit", "sans-serif"],
        mono: ["Kanit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
