import styled, { css } from 'styled-components';

export const Header = styled.h3`
  font-size: 0.875rem;
  margin: 0 0 2.5rem;
`;

export const Link = styled.span(
  ({ theme: { colors } }) => css`
    font-size: 0.875rem;
    color: ${colors.blue};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `,
);

export const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin: 0.5rem 0;
`;

export const Title = styled.div(
  ({ theme: { colors }, isOpen }) => css`
    position: relative;
    color: ${colors.blue00};
    font-size: 0.875rem;
    display: flex;
    align-items: center;

    ::after {
      position: absolute;
      top: 1.1rem;
      right: -1.75rem;
      width: 0;
      height: 0;
      border: 0.4rem solid transparent;
      border-top: ${isOpen ? 'none' : `0.5rem solid ${colors.blue00}`};
      border-bottom: ${isOpen ? `0.5rem solid ${colors.blue00}` : 'none'};
      content: ' ';
    }
  `,
);

export const HeaderIcons = styled.div`
  display: flex;
  margin-right: 1.5rem;
`;

export const HeaderIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 0.1rem;
`;

export const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
`;

export const Row = styled.div(
  ({ theme: { colors }, header }) => css`
    display: flex;
    padding: ${header ? '0.5rem 0' : '1rem 0'};
    color: ${header && colors.grey};
    border-bottom: 1px solid ${colors.greyE6};

    &:first-child {
      border-top: 1px solid ${colors.greyE6};
    }
  `,
);

export const Col = styled.div(
  ({ imageCol, labelCol }) => css`
    width: 25%;
    max-width: 25%;
    padding-right: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: ${imageCol ? 'center' : 'flex-start'};
    font-weight: ${labelCol && 'bold'};
  `,
);

export const DescriptionItem = styled.div`
  text-align: left;

  &:not(:first-child) {
    margin: 1rem 0 0;
  }
`;
