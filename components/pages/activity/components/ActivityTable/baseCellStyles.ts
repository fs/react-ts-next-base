import { css } from 'styled-components';

import { TTheme } from 'public/styles/theme';

const baseCellStyles = ({ up, breakpoints }: TTheme) => css`
  padding: 0.8rem 0.6rem;

  font-size: 0.8rem;
  line-height: 1.6;

  border-bottom: 1px solid #e1e1e1;

  ${up(breakpoints.lg)} {
    padding: 1.2rem 1rem;

    font-size: 0.9rem;
  }

  &:first-child {
    padding-left: 0;
  }
`;

export default baseCellStyles;
