import { FC } from 'react';

import Button from 'components/shared/atoms/Button';
import Icon from 'components/shared/atoms/Icon';

import { PageNumber, Wrapper } from './styled';
import { TActivityPagination } from './types';

const ActivityPagination: FC<TActivityPagination> = ({
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
        icon={<Icon name="arrow-chevron-left" $color="white" />}
      />

      <PageNumber>{pageNumber}</PageNumber>

      <Button
        testId="next-pagination"
        disabled={!hasNextPage}
        onClick={goToNextPage}
        iconType="only"
        icon={<Icon name="arrow-chevron-right" $color="white" />}
      />
    </Wrapper>
  );
};

export default ActivityPagination;
