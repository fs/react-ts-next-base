import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: calc(100% - ${headerHeight});
    background: ${colors.white};
  `,
);

export const Content = styled.div(
  ({ theme: { contentWidth } }) => css`
    max-width: ${contentWidth};
    padding: 4rem 2rem;
  `,
);

export const Header = styled.h1`
  margin: 0 0 1rem;
  font-size: 1.25rem;
  text-transform: uppercase;
  text-align: center;
`;

export const ListWrapper = styled.div`
  padding-bottom: 3rem;

  ol {
    list-style-type: none;
    counter-reset: item;
    margin: 0;
    padding: 0;

    li {
      display: table;
      counter-increment: item;
      width: 100%;
      margin-top: 2rem;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;

      &::before {
        content: counters(item, '.') '. ';
      }

      li {
        margin-top: 1rem;
        font-weight: normal;
        text-transform: none;
        text-align: left;

        &:before {
          display: table-cell;
          width: 1%;
          padding-right: 1rem;
          content: counters(item, '.') ' ';
        }
      }

      p {
        font-weight: normal;
        text-transform: none;
      }
    }
  }
`;
