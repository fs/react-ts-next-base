import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import Link from 'next/link';

export const CardWrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    justify-content: stretch;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 2rem 1.7rem;
    background-color: ${colors.white};
    box-shadow: 0 0 0.4rem ${transparentize(0.8, colors.shadow)};
    overflow: hidden;
    text-align: left;
  `,
);

export const LogoWrapper = styled.div(
  ({ logoUrl, theme: { down, breakpoints } }) => css`
    height: 3rem;
    background-size: ${logoUrl && 'contain'};
    margin: 0 auto 1.2rem 0;
    flex: none;

    ${down(breakpoints.md)} {
      height: 2.5rem;
    }
  `,
);

export const UnofficialCompanyName = styled(Link)(
  ({ theme: { colors } }) => css`
    display: block;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${colors.black};
    &:hover {
      text-decoration: underline;
    }
  `,
);

export const OfficialCompanyName = styled.span`
  display: block;
  font-size: 0.875rem;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const TextOverflow = styled.div`
  flex: none;
  width: 100%;
`;

export const RateContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1.8rem 0;

  span {
    display: inline-block;
    margin-right: 1rem;
    font-size: 0.875rem;
  }
`;

export const Description = styled.div`
  margin: -0.25rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  white-space: nowrap;

  span {
    display: inline-block;
    font-size: 0.875rem;
    margin: 0.25rem 0;
  }

  > span:first-child {
    margin-right: 0.25rem;
  }
`;

export const BlackList = styled.span(
  ({ bold }) => css`
    display: inline-block;
    font-size: 0.875rem;
    margin-top: 1rem;
    font-weight: ${bold ? 'bold' : 'normal'};
  `,
);
