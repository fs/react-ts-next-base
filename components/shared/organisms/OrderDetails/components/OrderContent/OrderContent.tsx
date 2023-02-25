import React from 'react';
import Link from 'next/link';
import { capitalize } from 'lodash';

import { COMPANY, ADMIN_COMPANY } from 'config/routes';
import { EXECUTION_STATUS_LABEL } from 'config/constants/executionStatus';
import { disputeReason, disputeStatus } from 'config/constants/dispute';
import { dateFormat, numberFormat, dateAndTimeFormat } from 'helpers';

import ActionLink from 'components/shared/atoms/ActionLink';

import OrderBuyerInfo from './OrderBuyerInfo';
import {
  Row,
  Col,
  LeftCol,
  RightCol,
  CompanyInfo,
  SellerNameWrapper,
  LogoWrapper,
  LogoSeller,
  Header,
  Status,
  Text,
  Coast,
  FlexBlock,
  DisputeDetails,
  TotalAmount,
} from '../../styled';
import { TOrderContent } from './types';

export const OrderContent: React.FunctionComponent<TOrderContent> = ({
  orderId,
  placedAt,
  executionStatus,
  orderCoast,
  isAdmin,
  dispute,
  isUserBuyer,
  buyer,
  seller,
}) => {
  const {
    officialName: officialSellerName,
    logoUrl: sellerLogoUrl,
    id: sellerId,
    legalForm,
  } = seller;
  const route = isAdmin ? ADMIN_COMPANY : COMPANY;

  return (
    <Row>
      <LeftCol>
        <Col>
          <div>
            <Header>Заказ № {orderId}</Header>
            {placedAt && <Text>Дата заказа: {dateFormat(placedAt)}</Text>}
          </div>
          <Status status={executionStatus}>
            Статус заказа:&nbsp;
            {executionStatus ? (
              capitalize(EXECUTION_STATUS_LABEL[executionStatus])
            ) : (
              <b> Не оформлен </b>
            )}
          </Status>
        </Col>
        {dispute && (
          <DisputeDetails>
            <div>Дата начала спора: {dateAndTimeFormat(dispute.createdAt)}</div>
            <div>Причина спора: {disputeReason[dispute.reason]}</div>
            <strong>Статус спора: {disputeStatus[dispute.status]}</strong>
          </DisputeDetails>
        )}
      </LeftCol>
      <RightCol>
        <FlexBlock>
          <OrderBuyerInfo isUserBuyer={isUserBuyer} route={route} isAdmin={isAdmin} buyer={buyer} />
          {(isUserBuyer || isAdmin) && (
            <CompanyInfo>
              <SellerNameWrapper>
                <div>Продавец:</div>
                <ActionLink
                  label={`${legalForm.shortName} “${officialSellerName}”`}
                  href={{ pathname: route, query: { companyId: sellerId } }}
                  $color="black"
                  bold
                  size={14}
                />
              </SellerNameWrapper>
              <LogoWrapper>
                <Link href={{ pathname: route, query: { companyId: sellerId } }} passHref>
                  <LogoSeller src={sellerLogoUrl} />
                </Link>
              </LogoWrapper>
            </CompanyInfo>
          )}
        </FlexBlock>
        <TotalAmount>
          Общая стоимость товаров: <Coast>{numberFormat(orderCoast)} руб.</Coast>
        </TotalAmount>
      </RightCol>
    </Row>
  );
};

export default OrderContent;
