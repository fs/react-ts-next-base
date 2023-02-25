import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const ProductPhotoWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    background-color: ${colors.greyF3};
    width: 100%;
    overflow: hidden;

    .carousel-root {
      height: 0;
      padding-top: 100%;

      .carousel {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;

        .slider-wrapper {
          height: 100%;

          .slider {
            display: flex;
            height: 100%;
            .slide {
              min-width: 100%;
            }
          }
        }
      }
    }
  `,
);

export const SelectedPhotoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SelectedPhoto = styled.img`
  max-width: 100%;
  max-height: 100%;
  &&& {
    width: auto;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  column-gap: 0.5rem;
`;

export const ProductStatus = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.875rem;
    font-weight: bold;
    background-color: ${colors.orange};
    color: ${colors.white};
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 2.625rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
);

export const ProductPhotosSlider = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    min-height: 4.625rem;
    padding: 1.25rem 0.25rem;
    display: flex;
    border-bottom: 1px solid ${colors.greyCC};

    > button {
      height: auto;
    }
  `,
);

export const ThumbnailsWrapper = styled.div`
  width: calc(100% - 4.7rem);
  display: flex;
  justify-content: center;
`;

export const Thumbnails = styled.div`
  margin: 0 0.5rem;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrolledWrapper = styled.div`
  display: flex;
`;

export const ThumbnailWrapper = styled.div(
  ({ theme: { colors }, selected }) => css`
    width: 4.625rem;
    min-width: 4.625rem;
    height: 4.625rem;
    background-color: ${colors.greyF3};
    box-shadow: 0 0 0.3rem ${transparentize(0.7, colors.shadow)};
    border: 1px solid ${selected ? colors.orange : 'transparent'};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.1s border;

    &:not(:first-child) {
      margin-left: 0.5rem;
    }
  `,
);

export const Thumbnail = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
