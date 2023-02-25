import React, { useEffect, useRef, useState } from 'react';

import { ProductDraftStepEnum, StatusEnum } from 'graphql/types';

import RejectComment from 'components/shared/atoms/RejectComment';

import CreateProductPager from '../CreateProductPager';
import CreateProductBasic from '../CreateProductBasic';
import CreateProductAddress from '../CreateProductAddress';
import CreateProductProperties from '../CreateProductProperties';
import CreateProductDelivery from '../CreateProductDelivery';
import CreateProductOwnDelivery from '../CreateProductOwnDelivery';
import CreateProductPrices from '../CreateProductPrices';
import CreateProductDiscounts from '../CreateProductDiscounts';

import { PagerWrapper, RejectCommentWrapper, ContentWrapper } from './styled';

const CreateProductContent = ({ product, companyId, query }) => {
  const { draftStep, status, rejectionMessage, template } = product;
  const readOnly = query?.readOnly === 'true';
  const firstStep = (template && readOnly) || !draftStep ? ProductDraftStepEnum.Basic : draftStep;
  const [selectedStep, setSelectedStep] = useState(firstStep);
  const [pagerHeight, setPagerHeight] = useState(0);
  const refPager = useRef(null);

  const steps = {
    [ProductDraftStepEnum.Basic]: (
      <CreateProductBasic
        readOnly={readOnly}
        product={product}
        onSubmitStep={setSelectedStep}
        query={query}
      />
    ),
    [ProductDraftStepEnum.Properties]: (
      <CreateProductProperties
        readOnly={readOnly}
        product={product}
        onSubmitStep={setSelectedStep}
      />
    ),
    [ProductDraftStepEnum.Address]: (
      <CreateProductAddress
        readOnly={readOnly}
        product={product}
        companyId={companyId}
        onSubmitStep={setSelectedStep}
      />
    ),
    [ProductDraftStepEnum.DeliveryConditions]: (
      <CreateProductDelivery readOnly={readOnly} product={product} onSubmitStep={setSelectedStep} />
    ),
    [ProductDraftStepEnum.Delivery]: (
      <CreateProductOwnDelivery
        readOnly={readOnly}
        product={product}
        onSubmitStep={setSelectedStep}
      />
    ),
    [ProductDraftStepEnum.Prices]: (
      <CreateProductPrices readOnly={readOnly} product={product} onSubmitStep={setSelectedStep} />
    ),
    [ProductDraftStepEnum.Discounts]: (
      <CreateProductDiscounts readOnly={readOnly} product={product} query={query} />
    ),
  };

  useEffect(() => {
    setPagerHeight(refPager.current?.clientHeight);
  }, [selectedStep]);

  return (
    <>
      <PagerWrapper ref={refPager}>
        {status === StatusEnum.Rejected && (
          <RejectCommentWrapper>
            <RejectComment comment={rejectionMessage} />
          </RejectCommentWrapper>
        )}
        <CreateProductPager
          readOnly={readOnly}
          setSelectedStep={setSelectedStep}
          draftStep={draftStep}
        />
      </PagerWrapper>
      <ContentWrapper pagerHeight={pagerHeight}>{steps[selectedStep]}</ContentWrapper>
    </>
  );
};

export default CreateProductContent;
