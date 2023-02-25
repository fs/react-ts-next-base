import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding: 0;
  width: 35rem;
  height: 35rem;
  overflow: hidden;
`;

export const Slider = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  transition: 0.3s transform ease-in-out;
`;

export const Slide = styled.div`
  position: relative;
  width: 35rem;
  height: 32.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageWrapper = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    height: 22.75rem;
    background-color: ${colors.blue00};
    display: flex;
    justify-content: center;
    align-items: center;
  `,
);

export const TextWrapper = styled.div`
  height: 10rem;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Title = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1.75rem;
`;

export const Text = styled.span`
  font-size: 0.85rem;
  margin-top: 1rem;
  text-align: center;
`;

export const PointsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Point = styled.div(
  ({ theme: { colors }, current }) => css`
    position: relative;
    background-color: ${current ? colors.blue : 'transparent'};
    border: 1px solid ${current ? 'transparent' : colors.grey};
    border-radius: 50%;
    width: 1.25rem;
    height: 1.25rem;
    margin: 0 0.6rem;
    &:hover {
      cursor: pointer;
    }
    &::before {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      background: ${current ? 'transparent' : colors.grey};
      content: '';
      transform: translate(-50%, -50%);
    }
  `,
);

export const Link = styled.span(
  ({ theme: { colors } }) => css`
    color: ${colors.blue};
    &:hover {
      cursor: pointer;
    }
  `,
);
