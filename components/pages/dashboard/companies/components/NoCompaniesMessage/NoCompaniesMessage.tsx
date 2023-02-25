import React from 'react';
import Link from 'next/link';

import { CONTRACT } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';

import { dateDiff } from 'helpers';
import { Wrapper, Image, Title, Subtitle, Description, Warning } from './styled';
import CreateCompanyButtons from './CreateCompanyButtons';

type TNoCompaniesMessage = {
  hasReservedGuestOrders: boolean;
  expiredAt: string;
};
const NoCompaniesMessage = ({ hasReservedGuestOrders = false, expiredAt }: TNoCompaniesMessage) => {
  if (hasReservedGuestOrders) {
    return (
      <Wrapper>
        <Image alt="agreement" src={`${process.env.ASSET_HOST}/images/agreement.png`} />
        <Title>Добро пожаловать!</Title>
        <Subtitle data-testid="message-for-user-from-cart">
          Вы практически у цели!
          <br />
          Чтобы официально оформить первую сделку на <br />
          нашем сайте, зарегистрируйте вашу компанию.
          <Description>
            Больше информации о безопасной сделке вы можете прочитать в<br />
            <Link href={CONTRACT} target="_blank" rel="noreferrer">
              Агентском договоре коммерческого представительства
            </Link>
          </Description>
        </Subtitle>

        <CreateCompanyButtons />

        <Warning data-testid="warning-remove-guest-orders">
          <Icon name="exclamation-square" $color="orange" $size={22} $mb={12} />
          {`Осталось
          ${dateDiff({
            start: new Date(),
            end: new Date(expiredAt),
          })}.`}
          <br />
          Если вы не зарегистрируете компанию, заказ пропадет.
        </Warning>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Image alt="agreement" src={`${process.env.ASSET_HOST}/images/agreement.png`} />
      <Title>Добрый день!</Title>
      <Subtitle>
        Добро пожаловать!
        <br /> Для возможности покупать и продавать на нашем
        <br /> сайте, зарегистрируйте вашу компанию.
      </Subtitle>

      <CreateCompanyButtons />
    </Wrapper>
  );
};

export default NoCompaniesMessage;
