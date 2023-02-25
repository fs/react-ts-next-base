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

export const Title = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.25rem;
  text-transform: uppercase;
  text-align: center;
`;

export const ListItemLi = styled.li`
  &&& {
    font-weight: normal;
    text-align: left;
    text-transform: none;
  }
`;

export const TableWrapper = styled.div`
  th {
    width: 50%;
  }
  td {
    text-align: left;
    font-weight: normal;
  }
`;

export const Paragraph = styled.p`
  text-align: right;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
`;

export const ContentLi = styled(ListItemLi)`
  &&& {
    margin-top: 0.75rem;
  }
`;

export const RightInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 100px 0 50px;
  width: 100%;
  div {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const ListWrapper = styled.div`
  padding-bottom: 3rem;
  ul {
    margin-left: 20px;
    list-style: disc;
  }

  ol {
    list-style-type: none;
    counter-reset: item;
    margin: 0;
    padding: 0;

    > li {
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

      > ol {
        > li {
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
      }

      p {
        font-weight: normal;
        text-transform: none;
      }
    }
  }
`;

export const Table = styled.table(
  ({ theme: { colors } }) => css`
    width: 100%;
    margin: 1rem 0;
    border: 1px solid ${colors.black};
    padding: 0;
    border-spacing: 0;
    border-collapse: collapse;
    td,
    th {
      padding: 0.5rem 1rem;
      border: 1px solid ${colors.black};
    }
  `,
);

export const ListSubtitle = styled.li`
  &&& {
    list-style-type: none;
    counter-increment: none;

    &::before {
      content: '';
    }
  }
`;
