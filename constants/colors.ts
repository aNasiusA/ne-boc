/**
 * Global color palette for the application
 * Based on a fiery terracotta and slate color scheme
 */

export const Colors = {
  // Primary colors
  primary: "#EC442C",
  primaryDark: "#263238",

  // Neutral colors
  dark: "#263238",
  slate: "#455A64",
  silver: "#BBBBBB",
  platinum: "#EBEBEB",

  // Semantic colors
  background: "#FFFFFF",
  surface: "#EBEBEB",
  text: "#263238",
  textSecondary: "#455A64",
  textLight: "#BBBBBB",
  accent: "#EC442C",

  // Additional colors for app
  white: "#FFFFFF",
  textMain: "#263238",
  textSub: "#455A64",
  border: "#BBBBBB",
  success: "#22C55E",
  successDark: "#15803D",

  // RGB format (for React Native with opacity)
  rgb: {
    primary: "rgb(236, 68, 44)",
    dark: "rgb(38, 50, 56)",
    slate: "rgb(69, 90, 100)",
    silver: "rgb(187, 187, 187)",
    platinum: "rgb(235, 235, 235)",
  },

  // RGBA format (with alpha channel)
  rgba: {
    primary: (opacity: number) => `rgba(236, 68, 44, ${opacity})`,
    dark: (opacity: number) => `rgba(38, 50, 56, ${opacity})`,
    slate: (opacity: number) => `rgba(69, 90, 100, ${opacity})`,
    silver: (opacity: number) => `rgba(187, 187, 187, ${opacity})`,
    platinum: (opacity: number) => `rgba(235, 235, 235, ${opacity})`,
  },
} as const;

/**
 * Theme object with organized color groups
 */
export const Theme = {
  colors: {
    // Brand colors
    brand: {
      fieryTerracotta: "#EC442C",
      jetBlack: "#263238",
      blueSlate: "#455A64",
      silver: "#BBBBBB",
      platinum: "#EBEBEB",
    },

    // UI colors
    ui: {
      primary: "#EC442C",
      secondary: "#455A64",
      background: "#FFFFFF",
      surface: "#EBEBEB",
      border: "#BBBBBB",
      divider: "#EBEBEB",
    },

    // Text colors
    text: {
      primary: "#263238",
      secondary: "#455A64",
      disabled: "#BBBBBB",
      inverse: "#FFFFFF",
      accent: "#EC442C",
    },

    // State colors (can be extended)
    state: {
      info: "#455A64",
      warning: "#EC442C",
    },
  },

  // Spacing scale (optional but useful)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // Border radius scale (optional)
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  },
} as const;

export default Colors;
