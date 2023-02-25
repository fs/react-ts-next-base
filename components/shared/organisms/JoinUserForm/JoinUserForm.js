import React from 'react';

import JoinUserFormContent from './JoinUserFormContent';

import { Wrapper, FormWrapper, Header, Description } from './styled';

const JoinUserForm = () => {
  return (
    <Wrapper data-testid="join-user-form">
      <FormWrapper>
        <Header>Добро пожаловать</Header>
        <Description>
          Для возможности вести дела в Medagregator заполните данные о себе.
        </Description>

        <JoinUserFormContent />
      </FormWrapper>
    </Wrapper>
  );
};

export default JoinUserForm;
