import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const CardWrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    justify-content: stretch;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${colors.white};
    padding: 0.6rem 1.3rem;
    text-align: left;
    box-shadow: 0 0 0.4rem ${transparentize(0.8, colors.shadow)};
    overflow: hidden;
    width: 100%;
  `,
);

export const Logo = styled.img`
  max-width: 100%;
  height: 100%;
`;

export const LogoWrapper = styled.div(
  ({ theme: { down, breakpoints } }) => css`
    height: 3.5rem;
    width: 3.5rem;
    flex-shrink: 0;
    margin-right: 1rem;
    overflow: hidden;
    border-radius: 1.125rem;

    ${down(breakpoints.md)} {
      height: 3rem;
      width: 3rem;
    }
  `,
);

export const UnofficialCompanyName = styled.span`
  display: block;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

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

export const CompanyCardWrapper = styled(CardWrapper)`
  flex-direction: row;
  justify-content: flex-start;
  height: 100%;
`;

export const Description = styled.div`
  overflow: hidden;
`;

export const Delimiter = styled.div(
  ({ theme: { colors } }) => css`
    height: 0.02rem;
    background-color: ${colors.greyA3};
    width: 3.8rem;
    margin: 0.8rem 0;
  `,
);

export const BlockingDate = styled.span`
  font-size: 0.875rem;
  display: inline-block;
  font-weight: 700;
`;
