import React, { ChangeEvent, useState } from 'react';

import withAuth from 'lib/auth/withAuth';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';

import { useActivity } from 'lib/apollo/hooks/state/activity';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';

import { ActivityEvent } from 'graphql/types';
import { activityEvents, activityPageSizes } from 'config/constants/activity';

import ActivityTable from './components/ActivityTable';
import ActivityDropdown from './components/ActivityDropdown';
import ActivityPagination from './components/ActivityPagination';

import { Wrapper, filterDropdownStyles, pageSizeDropdownStyles } from './styled';

const ActivityPage = () => {
  const [beforeCursor, setBeforeCursor] = useState<undefined | string>();
  const [afterCursor, setAfterCursor] = useState<undefined | string>();
  const [event, setEvent] = useState<undefined | ActivityEvent>();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(activityPageSizes[0]);

  const { activities, pageInfo, loading, error } = useActivity({
    before: beforeCursor,
    after: afterCursor,
    event,
    pageSize,
  });

  const resetState = () => {
    setBeforeCursor(undefined);
    setAfterCursor(undefined);
    setPageNumber(1);
  };

  const handleFilterChange = (changeEvent: ChangeEvent<HTMLSelectElement>) => {
    setEvent(changeEvent.target.value);
    resetState();
  };

  const handlePageSizeChange = (changeEvent: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+changeEvent.target.value);
    resetState();
  };

  return (
    <DefaultTemplate>
      <Wrapper>
        <ActivityDropdown
          label="Choose activity event:"
          selectedValue={event}
          values={activityEvents}
          hasEmptyOption
          onChange={handleFilterChange}
          testId="activity-event-dropdown"
          disabled={loading}
          customStyles={filterDropdownStyles}
        />

        <ActivityDropdown
          label="Choose activity page size:"
          selectedValue={pageSize}
          values={activityPageSizes.map(item => ({ value: item, name: item }))}
          onChange={handlePageSizeChange}
          testId="activity-size-dropdown"
          disabled={loading}
          customStyles={pageSizeDropdownStyles}
        />

        {pageInfo && (
          <ActivityPagination
            pageInfo={pageInfo}
            setBeforeCursor={setBeforeCursor}
            setAfterCursor={setAfterCursor}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
          />
        )}

        {!loading && !error && activities && <ActivityTable data={activities} />}
      </Wrapper>
    </DefaultTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(ActivityPage)));
