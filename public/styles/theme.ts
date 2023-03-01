import { configColors } from './config/colors';

const theme = {
  colors: configColors,

  breakpoints: {
    xs: 320,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },

  heightBreakpoints: {
    xs: 720,
    sm: 810,
    md: 960,
  },

  up: (breakpoint: number, vertical = false) =>
    `@media all and (min-${vertical ? 'height' : 'width'}: ${breakpoint + 0.02}px)`,

  down: (breakpoint: number, vertical = false) =>
    `@media all and (max-${vertical ? 'height' : 'width'}: ${breakpoint}px)`,

  between: (breakpointMin: number, breakpointMax: number, vertical = false) =>
    `@media (max-${vertical ? 'height' : 'width'}: ${breakpointMax}px) and (min-${
      vertical ? 'height' : 'width'
    }: ${breakpointMin + 0.02}px)`,
};

export type TTheme = typeof theme;
export default theme;
