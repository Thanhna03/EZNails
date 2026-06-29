/* eslint-disable comma-dangle */
import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Inter"],
        secondary: ["Kapakana"],
        anchor: ["Inclusive Sans"],
      },
      container: {
        center: true,
        padding: "1rem",
        width: "1168px",
        screens: {
          xl: "1168px",
        },
      },
      colors: {
        main: "var(--color-primary)",
        "main-foreground": "var(--color-primary-foreground)",
        secondary: "var(--color-secondary)",
        "secondary-foreground": "var(--color-secondary-foreground)",
        anchor: "var(--color-anchor)",
        "anchor-foreground": "var(--color-anchor-foreground)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        surface: "var(--color-surface)",
        "surface-foreground": "var(--color-surface-foreground)",
        "text-main": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        "text-blog": "var(--color-text-blog)",
        "text-blog-secondary": "var(--color-text-blog-secondary)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        success: "var(--color-success)",
        "success-foreground": "var(--color-success-foreground)",
        warning: "var(--color-warning)",
        "warning-foreground": "var(--color-warning-foreground)",
        danger: "var(--color-danger)",
        "danger-foreground": "var(--color-danger-foreground)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
