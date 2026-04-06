export interface Theme {
  fg: string
  fgMuted: string
  fgBright: string
  accent: string
  border: string
  link: string
}

const dark: Theme = {
  fg: "#D4D4D4",
  fgMuted: "#888888",
  fgBright: "#FFFFFF",
  accent: "#E8C87A",
  border: "#555555",
  link: "#8CB4FF",
}

const light: Theme = {
  fg: "#333333",
  fgMuted: "#777777",
  fgBright: "#000000",
  accent: "#B8860B",
  border: "#AAAAAA",
  link: "#2563EB",
}

export function getTheme(mode: "dark" | "light" | null): Theme {
  return mode === "light" ? light : dark
}
