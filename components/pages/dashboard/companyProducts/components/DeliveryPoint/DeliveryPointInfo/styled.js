import styled from 'styled-components';

export const DeliveryPointInfoWrapper = styled.div`
  display: flex;
  font-size: 0.75rem;
  width: 100%;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > div:nth-child(1) {
    margin: 0 0 0.75rem;
  }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;

  &:nth-child(1) {
    width: 40%;
    display: flex;
    justify-content: center;
  }

  &:nth-child(2) {
    width: 55%;
    margin-left: 5%;
  }
`;

export const Row = styled.div`
  display: flex;
`;

export const DellinFreightTypesWrapper = styled.div`
  width: 55%;
  min-width: 15rem;
  margin-left: 2rem;
`;

export const PhonesWrapper = styled.div`
  display: flex;
`;

export const PhonesList = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.75rem;
`;

export const PhoneItem = styled.div`
  &:not(:first-child) {
    margin: 0.2rem 0 0;
  }
`;
