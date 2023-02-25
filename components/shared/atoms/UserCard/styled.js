import styled, { css } from 'styled-components';
import Link from 'next/link';

export const CardWrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;

    margin: 0.4rem;
    padding: 1rem;
    background-color: ${colors.white};
    box-shadow: 0 0 0.4rem rgba(0, 61, 152, 0.2);

    font-size: 0.875rem;

    word-break: break-all;
  `,
);

export const UserInfo = styled.div(
  () => css`
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 1rem;
  `,
);

export const Role = styled.div(
  ({ theme: { colors } }) => css`
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${colors.blue};
    border-radius: 50%;

    color: ${colors.white};
    font-weight: 700;
  `,
);

export const FullName = styled(Link)(
  ({ theme: { colors } }) => css`
    color: ${colors.black};
    font-weight: 700;
    transition: 0.3s;
    &:hover {
      color: ${colors.blue};
      cursor: pointer;
    }
  `,
);

export const Email = styled.div(
  () => css`
    margin-bottom: 1rem;
    text-decoration: underline;
  `,
);

export const Date = styled.div(
  () =>
    css`
      margin-bottom: 1rem;
    `,
);

export const PhoneNumber = styled.div(
  () =>
    css`
      margin-bottom: 1rem;
    `,
);

export const ActionsWrapper = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: space-between;
  gap: 0.875rem;

  > * {
    width: 100%;
  }
`;
