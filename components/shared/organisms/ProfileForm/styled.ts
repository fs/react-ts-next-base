import styled from 'styled-components';

export const FormWrapper = styled.div`
  position: relative;

  width: 20rem;
  margin-right: auto;
  margin-left: auto;
`;

export const StyledTitle = styled.h3`
  max-width: 40rem;
  margin: 0 auto 1rem;

  line-height: 1.25;
  letter-spacing: -0.035rem;
`;

export const AvatarWrapper = styled.div`
  position: relative;

  width: 7rem;
  height: 7rem;
  margin: 0 0 1rem;
  overflow: hidden;

  border-radius: 50%;
`;

export const AvatarImg = styled.img`
  position: absolute;
  inset: -9999px;

  max-width: 100%;
  max-height: 100%;
  margin: auto;
`;
