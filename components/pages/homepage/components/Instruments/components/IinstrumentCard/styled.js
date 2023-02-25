import styled, { css } from 'styled-components';

export const InstrumentCardWrapper = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.white};
    padding: 2rem 1.1rem 1.1rem 1.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 24%;
    width: 100%;
    min-height: calc(var(--vh) * 40);
    transition: transform 0.5s;
    transform: translateZ(0);
    overflow: hidden;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    :hover {
      background: ${colors.blue} url(${process.env.ASSET_HOST}/images/item-background.png) center
        no-repeat;
      transform: perspective(219rem) translateZ(18.75rem);
      color: ${colors.white};

      p {
        color: ${colors.white};
      }

      button {
        color: ${colors.white};
        background-color: ${colors.blue};
      }
    }
  `,
);

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: normal;
`;

export const CardDescription = styled.p(
  ({ theme: { colors } }) => css`
    color: ${colors.grey};
    font-size: 0.8rem;
    min-height: 8rem;
  `,
);
