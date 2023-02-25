import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding-bottom: 2rem;
  font-size: 0.875rem;
  min-height: 15rem;
`;

export const Subscription = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.75rem;
    color: ${colors.greyA3};
    margin: 0.25rem 0 0;
  `,
);

export const Amount = styled.td(
  ({ theme: { colors }, color }) => css`
    color: ${colors[color]};
    white-space: nowrap;
    font-weight: 500;
  `,
);

export const Date = styled.td(
  ({ theme: { colors } }) => css`
    min-width: 7rem;
    color: ${colors.grey};

    > div {
      white-space: nowrap;
    }
  `,
);

export const Table = styled.table`
  width: 100%;
  margin: 1rem 0;
  padding: 0;
  border: none;
  border-spacing: 0;

  td {
    padding: 0.75rem 1rem;
    vertical-align: top;
  }
`;

export const HeaderCol = styled.th(
  ({ width, theme: { colors } }) => css`
    max-width: ${width ? `${width}rem` : 'auto'};
    width: ${`${width}rem` || '100%'};
    text-align: left;
    padding: 1rem;
    color: ${colors.greyCC};
    border-bottom: 1px solid ${colors.greyCC};
    border-top: 1px solid ${colors.greyCC};
    font-weight: 400;
  `,
);
