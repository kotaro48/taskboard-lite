/* コメント開始: JSとTailwindの両方で使うデザイントークンを集中管理するための定義 by codeX */
export const colorTokens = {
  primary: "#6366F1",
  primaryForeground: "#F5F3FF",
  surface: "#FFFFFF",
  surfaceMuted: "#EDF2FB",
  border: "#E2E8F0",
  neutral: "#0F172A",
  danger: "#EF4444",
  success: "#10B981",
} as const;

export const layoutTokens = {
  maxWidth: "78rem",
  gutterMin: "1rem",
  gutterMax: "2rem",
} as const;

export const typographyTokens = {
  fontFamily: '"Inter","SF Pro Display","Segoe UI","system-ui","sans-serif"',
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
} as const;

export const tokens = {
  colors: colorTokens,
  layout: layoutTokens,
  typography: typographyTokens,
} as const;
/* コメント終了 by codeX */
