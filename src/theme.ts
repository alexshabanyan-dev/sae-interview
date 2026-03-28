import { createTheme, type MantineColorsTuple } from "@mantine/core";

const ink: MantineColorsTuple = [
  "#f1f3f9",
  "#d4d9e8",
  "#b5bdd4",
  "#949fbf",
  "#7482aa",
  "#566694",
  "#3d4d7a",
  "#2a365f",
  "#1a223f",
  "#0c1020",
];

export const appTheme = createTheme({
  fontFamily:
    '"Outfit", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontFamilyMonospace:
    '"JetBrains Mono", ui-monospace, "Cascadia Code", monospace',
  defaultRadius: "md",
  primaryColor: "violet",
  colors: {
    ink,
  },
  headings: {
    fontFamily:
      '"Outfit", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeight: "700",
  },
  other: {
    meshFrom: "rgba(139, 92, 246, 0.35)",
    meshVia: "rgba(34, 211, 238, 0.12)",
    surface: "rgba(255, 255, 255, 0.04)",
    stroke: "rgba(255, 255, 255, 0.08)",
    glow: "rgba(139, 92, 246, 0.45)",
  },
});

declare module "@mantine/core" {
  export interface MantineThemeOther {
    meshFrom: string;
    meshVia: string;
    surface: string;
    stroke: string;
    glow: string;
  }
}
