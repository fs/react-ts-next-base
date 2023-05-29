import { useState } from 'react';

import withAuth from 'lib/auth/withAuth';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';

import { useMeActivities } from 'lib/apollo/hooks/state/meActivity';

import { ActivityEvent } from 'graphql/types';
import { TNextPage } from 'lib/apollo/types';

import Loader from 'components/shared/atoms/Loader';
import Select from 'components/shared/atoms/Select';
import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import ErrorPage from 'pages/_error';

import ActivityPagination from './components/ActivityPagination';
import ActivityTable from './components/ActivityTable';

import { ACTIVITY_EVENTS, ACTIVITY_PAGE_SIZE_OPTIONS, ACTIVITY_PAGE_SIZES } from './constants';

import { Wrapper } from './styled';
import { TEventChange, TSizeChange } from './types';

export const ActivityPage: TNextPage = () => {
  const [beforeCursor, setBeforeCursor] = useState<undefined | string>();
  const [afterCursor, setAfterCursor] = useState<undefined | string>();
  const [activityEvent, setActivityEvent] = useState<undefined | ActivityEvent>();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(ACTIVITY_PAGE_SIZES[0]);

  const { activities, pageInfo, loading, error } = useMeActivities({
    before: beforeCursor,
    after: afterCursor,
    event: activityEvent,
    pageSize,
  });

  const resetState = () => {
    setBeforeCursor(undefined);
    setAfterCursor(undefined);
    setPageNumber(1);
  };

  const onEventChange: TEventChange = value => {
    if (value === null) {
      setActivityEvent(undefined);
      resetState();
    } else if (value && 'value' in value) {
      setActivityEvent(value.value);
      resetState();
    }
  };

  const onPageSizeChange: TSizeChange = value => {
    if (value === null) {
      setActivityEvent(undefined);
      resetState();
    } else if (value && 'value' in value) {
      setPageSize(value.value);
      resetState();
    }
  };

  if (!loading && (error || !activities)) return <ErrorPage statusCode={404} />;

  return (
    <DefaultTemplate>
      <Wrapper>
        <Select
          name="activity-event"
          title="Choose activity event:"
          placeholder="Choose activity event:"
          options={ACTIVITY_EVENTS}
          value={ACTIVITY_EVENTS.find(({ value }) => value === activityEvent) || null}
          onChange={onEventChange}
          $mb={16}
        />
        <Select
          name="activity-size"
          title="Choose activity page size:"
          options={ACTIVITY_PAGE_SIZE_OPTIONS}
          value={ACTIVITY_PAGE_SIZE_OPTIONS.find(({ value }) => value === pageSize) || null}
          onChange={onPageSizeChange}
          isClearable={false}
          $mb={16}
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

        {!loading && activities ? (
          <ActivityTable activities={activities} />
        ) : (
          <Loader testId="activity-loading" />
        )}
      </Wrapper>
    </DefaultTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(ActivityPage)));
