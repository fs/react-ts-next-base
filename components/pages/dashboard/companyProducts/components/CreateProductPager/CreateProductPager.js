import React from 'react';

import { ProductDraftStepEnum } from 'graphql/types';
import { draftSteps } from 'config/constants/createProductSteps';

import { Wrapper, StepWrapper, Line, Step } from './styled';

const CreateProductPager = ({ setSelectedStep = () => {}, draftStep, readOnly }) => {
  const onChangeStep = step => {
    setSelectedStep(step);
  };

  const lastAvailableStep =
    (readOnly && draftStep === null ? ProductDraftStepEnum.Discounts : draftStep) ||
    ProductDraftStepEnum.Basic;

  return (
    <Wrapper>
      {draftSteps.map((item, index) => {
        const access = index <= draftSteps.indexOf(lastAvailableStep);
        return (
          <StepWrapper key={index} index={index}>
            {!!index && <Line access={access} />}
            {access ? (
              <Step onClick={() => onChangeStep(item)} access={access}>
                {index + 1}
              </Step>
            ) : (
              <Step>{index + 1}</Step>
            )}
          </StepWrapper>
        );
      })}
    </Wrapper>
  );
};

export default CreateProductPager;
