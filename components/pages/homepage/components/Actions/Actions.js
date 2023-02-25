import React from 'react';

import { AUTH } from 'config/routes';

import Button from 'components/shared/atoms/Button';

import { FooterWrapper, ContentWrapper, FooterTitle, ButtonsWrapper } from './styled';

const Actions = () => {
  return (
    <FooterWrapper>
      <ContentWrapper>
        <FooterTitle>
          БУДЬ В ТРЕНДЕ- <br />
          СИЛА В ОБЪЕДИНЕНИИ!
        </FooterTitle>
        <ButtonsWrapper>
          <Button
            label="ХОЧУ КУПИТЬ"
            variant="ghost"
            $width="11rem"
            href={{ pathname: AUTH, query: { signup: true } }}
          />
          <Button
            label="ХОЧУ ПРОДАТЬ"
            variant="ghost"
            $width="11rem"
            href={{ pathname: AUTH, query: { signup: true } }}
          />
        </ButtonsWrapper>
      </ContentWrapper>
    </FooterWrapper>
  );
};

export default Actions;
