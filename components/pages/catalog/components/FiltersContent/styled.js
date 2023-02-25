import styled from 'styled-components';
import theme from 'public/styles/theme';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`;

export const InputTitle = styled.p`
  font-size: 0.8rem;
  margin: 0.45rem 0 0.45rem 0.6rem;
  color: ${theme.colors.grey43};
`;

export const RangeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

export const Title = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0;
`;

export const RangeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuestionWrapper = styled.div`
  margin-left: 0.6rem;
`;

export const SeparatorWrapper = styled.p`
  font-weight: bold;
`;

export const RateBlockWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const RateItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RatingWrapper = styled.div`
  margin: 1rem 0;
`;

export const CheckboxLabel = styled.div`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div`
  position: relative;
`;
