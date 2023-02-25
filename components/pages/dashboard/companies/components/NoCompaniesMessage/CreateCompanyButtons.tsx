import React from 'react';
import { DASHBOARD_CREATE_COMPANY } from 'config/routes';
import { BUYER, SELLER } from 'config/constants/directions';

import Button from 'components/shared/atoms/Button';
import { ButtonsWrapper } from './styled';

const CreateCompanyButtons = () => (
  <>
    <b> Зарегистрировать компанию </b>
    <ButtonsWrapper>
      <Button
        $width="10.2rem"
        label="Я продавец"
        testId="create-first-seller-company-button"
        href={{ pathname: DASHBOARD_CREATE_COMPANY, query: { isFirst: true, direction: SELLER } }}
      />

      <Button
        $width="10.2rem"
        label="Я покупатель"
        testId="create-first-buyer-company-button"
        href={{ pathname: DASHBOARD_CREATE_COMPANY, query: { isFirst: true, direction: BUYER } }}
      />
    </ButtonsWrapper>
  </>
);

export default CreateCompanyButtons;
