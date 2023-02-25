import styled from 'styled-components';
import theme from 'public/styles/theme';

export const LightWrapper = styled.div`
  background: ${theme.colors.blue00};
  padding: 1rem 0.5rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;
