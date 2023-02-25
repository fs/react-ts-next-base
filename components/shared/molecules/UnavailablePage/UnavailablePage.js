import React from 'react';
import useRouter from 'hooks/useRouter';

import Button from 'components/shared/atoms/Button';

import {
  UnavailablePageWrapper,
  UnavailablePageMessageWrapper,
  UnavailablePageMessageImage,
  UnavailablePageMessageTitle,
  UnavailablePageMessageDescription,
} from './styled';

const UnavailablePage = () => {
  const { back } = useRouter();

  return (
    <UnavailablePageWrapper>
      <UnavailablePageMessageWrapper>
        <UnavailablePageMessageTitle>Ой!</UnavailablePageMessageTitle>
        <UnavailablePageMessageDescription>
          Эта страница находится в разработке
        </UnavailablePageMessageDescription>
        <Button label="Вернуться" onClick={back} />
        <UnavailablePageMessageImage
          alt="unavailable-page"
          src={`${process.env.ASSET_HOST}/images/unavailable-page.png`}
        />
      </UnavailablePageMessageWrapper>
    </UnavailablePageWrapper>
  );
};

export default UnavailablePage;
