import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // CSS variable-based colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Light mode colors
        "light-bg": "#F4F5FA",
        "light-card": "#FFFFFF",
        "light-card-bg": "#FFFFFF", // Alias for light-card
        "light-table-header": "#F6F7FB",
        "feature-card-bg": "#F4F5FA",
        "light-text-primary": "rgba(46, 38, 61, 0.9)",
        "light-text-secondary": "rgba(46, 38, 61, 0.7)",

        // Dark mode colors
        "dark-bg": "#28243D",
        "dark-card": "#312D4B",
        "dark-card-bg": "#312D4B", // Alias for dark-card
        "dark-table-header": "#3D3759",
        "dark-text-primary": "rgba(231, 227, 252, 0.9)",
        "dark-text-secondary": "rgba(231, 227, 252, 0.7)",

        // Primary colors
        "primary": "#8C57FF",
        "primary-light": "rgba(140, 87, 255, 0.16)",
        "primary-foreground": "#FFFFFF",
        "primary-text": "#FFFFFF", // Alias for primary-foreground

        // Secondary colors
        "secondary-bg": "rgba(138, 141, 147, 0.16)",
        "secondary-text": "rgba(138, 141, 147, 1)",
        "secondary-light": "rgba(138, 141, 147, 0.16)",

        // Status colors
        success: "#56CA00",
        "success-light": "rgba(86, 202, 0, 0.16)",
        error: "#FF4C51",
        "error-light": "rgba(255, 76, 81, 0.16)",
        info: "#16B1FF",
        "info-light": "rgba(22, 177, 255, 0.16)",
        warning: "#FFB400",
        "warning-light": "rgba(255, 180, 0, 0.16)",

        // Divider color
        divider: "rgba(138, 141, 147, 0.2)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config