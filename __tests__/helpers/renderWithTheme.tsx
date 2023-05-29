import { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

import theme from 'public/styles/theme';

export default function renderWithTheme(component: ReactElement): ReactElement {
  return <ThemeProvider theme={theme}>{component}</ThemeProvider>;
}
