import styled, { css } from 'styled-components';

import { getMarginStyles, TMargin } from 'public/styles/config/margin';

export const PhotosWrapper = styled.div(
  (props: TMargin) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;

    ${getMarginStyles(props)}
  `,
);

export const SortableWrapper = styled.div(
  ({ theme: { colors } }) => css`
    > div {
      background-color: ${colors.transparent};
      display: flex;
      flex-wrap: wrap;
      gap: 0.7rem;
      border-radius: 0.875rem;
    }

    button {
      cursor: grab;
    }
  `,
);

export const PhotoWrapper = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
`;

export const PhotoContainer = styled.div<{ withPhoto?: boolean }>(
  ({ theme: { colors }, withPhoto }) => css`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.875rem;
    border: 1px solid ${colors.greyCF};
    background-color: ${colors.white};

    &&& {
      button {
        height: 100%;
        width: 100%;
      }
    }

    ${withPhoto &&
    `
    & > div {
      width: 100%;
      height: 100%;
    }
    `}
  `,
);

export const PhotoImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  max-width: 100%;
`;

export const EmbedPdf = styled.iframe`
  pointer-events: none;
  overflow: hidden;
  border: none;
`;

export const RemovePhoto = styled.div`
  position: absolute;
  right: -0.3rem;
  top: -0.3rem;

  button {
    cursor: pointer;
  }
`;

export const DownloadLink = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
