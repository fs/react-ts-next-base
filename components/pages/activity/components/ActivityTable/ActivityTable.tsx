import { FC } from 'react';

import DataCell from './DataCell';

import { TActivityTable } from './types';
import { StyledTable, HeaderCell, EmptyList } from './styled';

const ActivityTable: FC<TActivityTable> = ({ activities }) => {
  const columnNames = ['Title', 'Description'];

  return (
    <>
      {activities.length > 0 ? (
        <StyledTable data-testid="activity-table">
          <thead>
            <tr>
              {columnNames.map(name => (
                <HeaderCell key={name}>{name}</HeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {activities.map(({ id, title, body }) => {
              return (
                <tr key={id} data-testid="activity-row">
                  <DataCell>{title}</DataCell>
                  <DataCell>{body}</DataCell>
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
