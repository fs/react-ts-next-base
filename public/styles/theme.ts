const theme = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    grey: '#8c8c8c',
    greyC4: '#c4c4c4',
    greyA3: '#a3a3a3',
    greyA4: '#A4A4A4',
    greyCC: '#CCCCCC',
    grey43: '#435152',
    grey6E: '#6E748D',
    greyCF: '#CFCFCF',
    greyE6: '#E6E6E6',
    greyFO: '#F0F0F0',
    greyB6: '#B6B6B6',
    greyF1: '#f1f2f6',
    greyF3: '#F3F2F5',
    grey73: '#737373',
    orange: '#ff8a00',
    orangeF7: '#F78216',
    orangeFF: '#FFA51F',
    green: '#25b900',
    green2B: '#2BD700',
    green9E: '#9EF2D7',
    lightGreen: '#0afebb',
    blue: '#1143fe',
    blue49: '#4970FF',
    blue72: '#7290ff',
    blue00: '#003D98',
    blueEE: '#EEF5FF',
    blueF3: '#f3f7f9',
    blue37: '#3766a9',
    blue4d: '#4d76b7',
    blue2F: '#2F80E7',
    blueA6: '#A6CEE3',
    darkBlue: '#1a3254',
    beige: '#F5F5DC',
    error: '#ff3d00',
    shadow: '#204070',
    redE5: '#E52D2D',
    transparent: 'transparent',
  },

  headerHeight: '4.5rem',
  contentWidth: '72rem',
  sidebarWidth: '16.5rem',
  topBarHeight: '4.3rem',

  breakpoints: {
    xs: 480,
    sm: 768,
    md: 1024,
    lg: 1200,
    xl: 1440,
    xxl: 1600,
    xxxl: 1750,
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
