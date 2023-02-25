import styled from 'styled-components';
import { TCanvasStyles } from './types';

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.9rem 1.2rem;
  min-width: 20rem;

  > button {
    margin-right: 1rem;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
  min-width: 20rem;
  img {
    max-width: 27rem;
    max-height: 27rem;
  }
`;

export const canvasStyles = ({ height, width }: TCanvasStyles) => {
  return {
    height,
    width,
    display: 'none',
  };
};
