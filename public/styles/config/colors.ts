import { Property } from 'csstype';

export type ColorKeys =
  | 'black'
  | 'white'
  | 'grey'
  | 'greyC4'
  | 'greyA3'
  | 'greyA4'
  | 'greyCC'
  | 'grey43'
  | 'grey6E'
  | 'greyCF'
  | 'greyE6'
  | 'greyFO'
  | 'greyB6'
  | 'greyF1'
  | 'greyF3'
  | 'grey73'
  | 'orange'
  | 'orangeF7'
  | 'green'
  | 'green9E'
  | 'lightGreen'
  | 'blue'
  | 'blue00'
  | 'blueEE'
  | 'blueF3'
  | 'blue37'
  | 'blue4d'
  | 'blue2F'
  | 'blue49'
  | 'blueA6'
  | 'darkBlue'
  | 'beige'
  | 'error'
  | 'shadow'
  | 'redE5';

type Colors = { [key in ColorKeys]: Property.Color };

export const configColors: Colors = {
  black: '#000',
  white: '#fff',
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
  green: '#25b900',
  green9E: '#9EF2D7',
  lightGreen: '#0afebb',
  blue: '#1143fe',
  blue00: '#003D98',
  blueEE: '#EEF5FF',
  blueF3: '#f3f7f9',
  blue37: '#3766a9',
  blue4d: '#4d76b7',
  blue2F: '#2F80E7',
  blue49: '#4970FF',
  blueA6: '#A6CEE3',
  darkBlue: '#1a3254',
  beige: '#F5F5DC',
  error: '#ff3d00',
  shadow: '#204070',
  redE5: '#E52D2D',
};
