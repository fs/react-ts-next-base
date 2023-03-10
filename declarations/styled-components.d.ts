import theme, { TTheme } from 'public/styles/theme';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends TTheme{}
}
