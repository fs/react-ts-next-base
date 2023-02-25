import React from 'react';

import { DASHBOARD_CREATE_COMPANY } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import { CreateCompanyButtonWrapper, ButtonText } from './styled';

const CreateCompanyButton = ({ direction }) => {
  return (
    <CreateCompanyButtonWrapper>
      <Button
        $width="15.5rem"
        shape="extra-rounded"
        testId="create-company-button"
        href={{ pathname: DASHBOARD_CREATE_COMPANY, query: { direction } }}
      >
        <Icon name="folder-add" $size={40} $color="white" />
        <ButtonText>
          Добавить <br />
          компанию
        </ButtonText>
      </Button>
    </CreateCompanyButtonWrapper>
  );
};

export default CreateCompanyButton;
