import React from 'react';
import Link from 'next/link';

import { COMPANY } from 'config/routes';

import Button from 'components/shared/atoms/Button';
import Rating from 'components/shared/atoms/Rating';
import LogoCompany from 'components/shared/atoms/LogoCompany';

import { BLACKLISTED } from 'config/constants/status';
import { dateFormat } from 'helpers';
import {
  CardWrapper,
  LogoWrapper,
  OfficialCompanyName,
  UnofficialCompanyName,
  TextOverflow,
  RateContainer,
  Description,
  BlackList,
  Row,
} from './styled';

const getStatusText = ({ status, blacklistedAt }) => {
  if (status === BLACKLISTED) {
    return `Дата блокировки: ${dateFormat(blacklistedAt)}`;
  }

  return `Компания была в черном списке: ${blacklistedAt ? 'Да' : 'Нет'}`;
};

const CompanyCard = ({ company }) => {
  const {
    id: companyId,
    unofficialName,
    officialName,
    rating = 2.4,
    deliveredOrdersCount,
    receivedReviewsCount,
    blacklistedAt,
    status,
  } = company;
  return (
    <CardWrapper data-testid="company-card">
      <LogoWrapper>
        <Link href={{ pathname: COMPANY, query: { companyId } }} passHref>
          <LogoCompany company={company} />
        </Link>
      </LogoWrapper>
      <TextOverflow>
        <UnofficialCompanyName href={{ pathname: COMPANY, query: { companyId } }} passHref>
          {unofficialName}
        </UnofficialCompanyName>
        <OfficialCompanyName>{officialName}</OfficialCompanyName>
      </TextOverflow>
      <RateContainer>
        <span>Рейтинг: </span>
        <Rating rating={rating} />
      </RateContainer>
      <Description>
        <Row>
          <span>Доставленные заказы: </span>
          <span>{deliveredOrdersCount}</span>
        </Row>
        <Row>
          <span>Количество отзывов: </span>
          <span>{receivedReviewsCount}</span>
        </Row>
        <BlackList bold={status === BLACKLISTED}>
          {getStatusText({ status, blacklistedAt })}
        </BlackList>
      </Description>

      <Button label="Подробнее" href={{ pathname: COMPANY, query: { companyId } }} />
    </CardWrapper>
  );
};

export default CompanyCard;
