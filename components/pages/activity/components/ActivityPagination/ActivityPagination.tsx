import React from 'react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import { TActivityPagination } from './types';
import { Wrapper, PageNumber } from './styled';

const ActivityPagination: React.FunctionComponent<TActivityPagination> = ({
  pageInfo,
  setBeforeCursor,
  setAfterCursor,
  pageNumber,
  setPageNumber,
}) => {
  const { hasPreviousPage, hasNextPage, startCursor, endCursor } = pageInfo;

  const goToPrevPage = () => {
    if (startCursor) {
      setBeforeCursor(startCursor);
      setAfterCursor(undefined);
      setPageNumber(prevPageNumber => prevPageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (endCursor) {
      setAfterCursor(endCursor);
      setBeforeCursor(undefined);
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  };

  return (
    <Wrapper data-testid="activity-pagination">
      <Button
        disabled={!hasPreviousPage}
        onClick={goToPrevPage}
        iconType="only"
        icon={<Icon name="arrow-chevron-left" />}
      />

      <PageNumber>{pageNumber}</PageNumber>

      <Button
        testId="next-pagination"
        disabled={!hasNextPage}
        onClick={goToNextPage}
        iconType="only"
        icon={<Icon name="arrow-chevron-right" />}
      />
    </Wrapper>
  );
};

export default ActivityPagination;
