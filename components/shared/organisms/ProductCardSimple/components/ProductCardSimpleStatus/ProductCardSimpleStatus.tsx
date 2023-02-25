import React, { FC } from 'react';

import Icon from 'components/shared/atoms/Icon';

import { StatusEnum } from 'graphql/types';
import { getVerificationDeadline } from 'helpers';

import { Status } from './styled';
import { TProductCardSimpleStatus } from './types';

const ProductCardSimpleStatus: FC<TProductCardSimpleStatus> = ({
  status,
  verificationDeadlineAt,
  rejectsCount,
  deleted,
}) => {
  return (
    <>
      {status === StatusEnum.NotVerified && !deleted && (
        <Status>
          <Icon name="timer" $size={21} $color="white" $mr={14} />
          <div>
            {getVerificationDeadline(verificationDeadlineAt)}
            {rejectsCount > 0 && <div>повторная проверка</div>}
          </div>
        </Status>
      )}
    </>
  );
};

export default ProductCardSimpleStatus;
