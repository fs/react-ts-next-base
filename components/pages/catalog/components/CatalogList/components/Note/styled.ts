import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const NoteWrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    justify-content: space-between;

    padding: 0.75rem 2rem;
    margin-bottom: 1rem;

    background-color: ${colors.blueEE};

    box-shadow: 0 0.25rem 0.25rem ${transparentize(0.8, colors.shadow)};
  `,
);
export const WrapSentences = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
`;

export const Sentence = styled.span`
  white-space: nowrap;
`;

export const InfoDescription = styled.div(
  ({ theme: { colors } }) => css`
    margin-bottom: 0.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: ${colors.blue00};
  `,
);

export const PriceDescription = styled.div(
  ({ theme: { colors } }) => css`
    font-weight: 700;

    color: ${colors.green};
  `,
);

export const Image = styled.img(
  ({ theme: { down, breakpoints } }) => css`
    margin-left: 0.5rem;
    max-height: 6rem;
    align-self: center;

    ${down(breakpoints.md)} {
      display: none;
    }
  `,
);
