import React from 'react';

import Loader from 'components/shared/atoms/Loader';

import { TooltipWrapper } from './styled';

const SubmitTooltip = ({ action, itemsAmount = 0, isLoading = false }) => {
  const isDisabled = itemsAmount === 0;
  return (
    <TooltipWrapper type="button" onClick={action} disabled={isDisabled}>
      {isLoading ? (
        <Loader variant="simple" size={17} />
      ) : isDisabled ? (
        'Ничего не найдено'
      ) : (
        `Показать (${itemsAmount})`
      )}
    </TooltipWrapper>
  );
};

export default SubmitTooltip;
