import styled, { css } from 'styled-components';

export const Address = styled.span`
  max-width: 70%;
`;

export const StyledLink = styled.span(
  ({ theme: { colors } }) => css`
    color: ${colors.blue};
    width: fit-content;
    height: fit-content;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `,
);

export const DeliveryAddressContent = styled.div(
  ({ theme: { colors } }) => css`
    padding: 2.5rem 2rem;
    border-bottom: 1px solid ${colors.grey};
  `,
);

export const Title = styled.h2`
  font-size: 0.875rem;
  font-weight: bold;
  margin: 0 0 1.25rem;
`;

export const Subtitle = styled.p(
  ({ theme: { colors } }) => css`
    font-size: 0.75rem;
    color: ${colors.grey};
  `,
);

export const AddressesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
  gap: 1.5rem;
`;

export const ActionsWrapper = styled.div`
  padding: 0.75rem 0.75rem 0.75rem 2rem;
  display: flex;
  justify-content: space-between;
`;

export const Description = styled.span(
  ({ theme: { colors } }) => css`
    font-size: 0.75rem;
    color: ${colors.orange};
  `,
);

export const AddressListItem = styled.div(
  ({ theme: { colors }, selected }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    min-height: 12.25rem;
    border: 2px solid ${selected ? colors.green : colors.greyA3};
    border-radius: 0.75rem;
    font-size: 0.75rem;
    padding: 1rem 1rem 1.25rem;
    cursor: ${selected ? 'default' : 'pointer'};
  `,
);

export const LocationDescription = styled.div`
  width: 100%;
  text-align: left;
`;

export const City = styled.div`
  margin: 0 0 0.35rem;
`;

export const Text = styled.p`
  margin: 0 0 1rem;
`;

export const Comment = styled.p(
  ({ theme: { colors } }) => css`
    word-wrap: break-word;
    color: ${colors.greyA3};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
);
