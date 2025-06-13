import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Light mode background colors
        "light-bg": "#F4F5FA",
        "light-card-bg": "#FFFFFF",
        "light-table-header": "#F6F7FB",
        "feature-card-bg": "#F4F5FA",

        // Dark mode background colors
        "dark-bg": "#28243D",
        "dark-card-bg": "#312D4B",
        "dark-table-header": "#3D3759",

        // Text colors
        "light-text-primary": "rgba(46, 38, 61, 0.9)",
        "light-text-secondary": "rgba(46, 38, 61, 0.7)",
        "dark-text-primary": "rgba(231, 227, 252, 0.9)",
        "dark-text-secondary": "rgba(231, 227, 252, 0.7)",

        // Primary colors
        primary: "#8C57FF",
        "primary-light": "rgba(140, 87, 255, 0.16)",
        "primary-foreground": "#FFFFFF",

        // Status colors
        success: "#56CA00",
        "success-light": "rgba(86, 202, 0, 0.16)",
        error: "#FF4C51",
        "error-light": "rgba(255, 76, 81, 0.16)",
        info: "#16B1FF",
        "info-light": "rgba(22, 177, 255, 0.16)",
        warning: "#FFB400",
        "warning-light": "rgba(255, 180, 0, 0.16)",
        secondary: "#8A8D93",
        "secondary-light": "rgba(138, 141, 147, 0.16)",
        "secondary-foreground": "rgba(46, 38, 61, 0.9)",

        // Divider color
        divider: "rgba(138, 141, 147, 0.2)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
