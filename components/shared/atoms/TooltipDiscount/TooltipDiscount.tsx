import React, { useMemo } from 'react';

import { WEEKDAYS_FORMATTED } from 'config/constants/discount';
import { dateFormat } from 'helpers';

import Tooltip from 'components/shared/atoms/Tooltip';

import { TTooltipDiscount } from './types';
import { Col, DiscountInfo, Discount, TooltipWrapper } from './styled';

const TooltipDiscount = ({
  periodDiscount,
  weeklyDiscount,
  discount,
  ...props
}: TTooltipDiscount) => {
  const tooltipDiscount = useMemo(() => {
    return (
      <Col>
        {weeklyDiscount && (
          <DiscountInfo>
            Скидка {weeklyDiscount.amount}% при заказе по{' '}
            {WEEKDAYS_FORMATTED[weeklyDiscount.weekday]}
          </DiscountInfo>
        )}
        {periodDiscount && (
          <DiscountInfo>
            Скидка {periodDiscount.amount}% при заказе от {dateFormat(periodDiscount.startDate)} до{' '}
            {dateFormat(periodDiscount.endDate)}
          </DiscountInfo>
        )}
      </Col>
    );
  }, [weeklyDiscount, periodDiscount]);

  return (
    <TooltipWrapper {...props}>
      <Tooltip text={tooltipDiscount} $width="auto">
        <Discount>-{discount}%</Discount>
      </Tooltip>
    </TooltipWrapper>
  );
};
export default TooltipDiscount;
