/* コメント開始: ブランドトークンとレスポンシブ設定を定義してUIを一貫させるための構成追加 by codeX */
const colors = {
  primary: "#6366F1",
  primaryForeground: "#F5F3FF",
  surface: "#FFFFFF",
  surfaceMuted: "#F8FAFC",
  border: "#E2E8F0",
  danger: "#EF4444",
  success: "#10B981",
  neutral: "#0F172A",
};

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: colors.surface,
          muted: colors.surfaceMuted,
        },
        border: colors.border,
        danger: colors.danger,
        success: colors.success,
        primary: {
          DEFAULT: colors.primary,
          foreground: colors.primaryForeground,
        },
        neutral: colors.neutral,
      },
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "Segoe UI", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1.25rem",
      },
      boxShadow: {
        card: "0px 10px 40px rgba(15, 23, 42, 0.08)",
      },
      fontSize: {
        xs: ["0.75rem", "1rem"],
        sm: ["0.875rem", "1.3rem"],
        base: ["1rem", "1.5rem"],
        lg: ["1.125rem", "1.75rem"],
        xl: ["1.25rem", "1.85rem"],
        "2xl": ["1.5rem", "2rem"],
      },
      screens: {
        xs: "24rem",
        "2xl": "90rem",
      },
    },
  },
  plugins: [],
};

export default config;
/* コメント終了 by codeX */
