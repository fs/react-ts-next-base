import React from 'react';
import Link from 'next/link';

import ActionLink from 'components/shared/atoms/ActionLink';

import { CompanyInfo, LogoSeller, LogoWrapper, SellerNameWrapper, Strong } from '../../styled';
import { TOrderBuyerInfo } from './types';

const OrderBuyerInfo = ({ buyer, isAdmin, isUserBuyer, route }: TOrderBuyerInfo) => {
  if (!buyer)
    return (
      <CompanyInfo>
        <SellerNameWrapper>
          <div>Покупатель:</div>
          <Strong>-</Strong>
        </SellerNameWrapper>
      </CompanyInfo>
    );

  const { id, officialName, logoUrl, legalForm } = buyer;

  if (isAdmin)
    return (
      <CompanyInfo>
        <SellerNameWrapper>
          <div>Покупатель:</div>
          <ActionLink
            label={`${legalForm.shortName} “${officialName}”`}
            href={{ pathname: route, query: { companyId: id } }}
            $color="black"
            size={14}
            bold
          />
        </SellerNameWrapper>
        <LogoWrapper>
          <Link href={{ pathname: route, query: { companyId: id } }} passHref>
            <LogoSeller src={logoUrl} />
          </Link>
        </LogoWrapper>
      </CompanyInfo>
    );

  if (!isUserBuyer)
    return (
      <CompanyInfo>
        <SellerNameWrapper>
          <div>Покупатель:</div>
          <Strong>{`${legalForm.shortName} “${officialName}”`}</Strong>
        </SellerNameWrapper>
        <LogoWrapper>
          <LogoSeller src={logoUrl} />
        </LogoWrapper>
      </CompanyInfo>
    );
  return <></>;
};

export default OrderBuyerInfo;
