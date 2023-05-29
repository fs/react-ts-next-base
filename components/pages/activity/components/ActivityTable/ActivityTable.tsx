import { FC } from 'react';

import ProfileImage from 'components/shared/atoms/ProfileImage';

import { ACTIVITY_EVENTS_COLORS } from './constants';
import DataCell from './DataCell';

import { ColorLabel, EmptyList, HeaderCell, StyledTable, UserInfo } from './styled';
import { TActivityTable } from './types';

const ActivityTable: FC<TActivityTable> = ({ activities }) => {
  const columnNames = ['Title', 'Description', 'Date', 'User'];

  return (
    <>
      {activities.length > 0 ? (
        <StyledTable data-testid="activity-table">
          <thead>
            <tr>
              {columnNames.map((name, id) => (
                <HeaderCell key={name} colSpan={!id ? 2 : 1}>
                  {name}
                </HeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {activities.map(({ id, title, body, createdAt, event, user }) => {
              const name = `${user?.firstName} ${user?.lastName}`;

              return (
                <tr key={id} data-testid="activity-row">
                  <ColorLabel color={ACTIVITY_EVENTS_COLORS[event]} />
                  <DataCell>{title}</DataCell>
                  <DataCell>{body}</DataCell>
                  <DataCell>{new Date(createdAt).toLocaleString()}</DataCell>
                  <DataCell>
                    <ProfileImage avatar={user?.avatarUrl} />
                    <UserInfo>
                      {name} ({user.email})
                    </UserInfo>
                  </DataCell>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      ) : (
        <EmptyList data-testid="activity-table-empty">No records found</EmptyList>
      )}
    </>
  );
};
export default ActivityTable;
