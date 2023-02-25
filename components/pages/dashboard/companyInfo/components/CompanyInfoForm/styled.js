import styled, { css } from 'styled-components';

export const CompanyInfoWrapper = styled.div`
  padding: 2rem 2.5rem;
`;

export const Title = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.blue00};
    font-size: 0.875rem;
    font-weight: bold;
    margin: 0 0 1rem;
  `,
);

export const Description = styled.div`
  font-size: 0.875rem;
  margin: 0 0 1.5rem;
`;

export const FieldWrapper = styled.div(
  ({ width }) => `
  position: relative;
  width: ${width || 100}%;
`,
);

export const RejectCommentWrapper = styled.div`
  padding: 0 1rem 1rem;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const SelectWrapper = styled.div(
  ({ isRejected }) => css`
    ${isRejected &&
    `
  div[class$='-control'] {
    border: 1px solid orange;
  }
  `}
  `,
);

export const CompanyInfoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 0 1rem;
`;

export const ListItem = styled.div(
  ({ theme: { colors }, editing, width }) => css`
    position: relative;
    width: ${width}%;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    font-weight: normal;
    border: 1px solid ${colors.greyCC};
    background-color: ${editing ? colors.greyF1 : colors.white};
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.5s;

    &:not(:last-child) {
      margin: 0 0 0.875rem;
    }
  `,
);

export const ListItemTitle = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    top: -0.35rem;
    left: 0.5rem;
    font-size: 0.7rem;
    background-color: ${colors.white};
    color: ${colors.grey};
    padding: 0 0.5rem;
    border-radius: 0.2rem;
  `,
);

export const LogoUploadWrapper = styled.div`
  margin: 0 0 1.5rem;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.875rem 0 0;
  column-gap: 0.75rem;
`;
