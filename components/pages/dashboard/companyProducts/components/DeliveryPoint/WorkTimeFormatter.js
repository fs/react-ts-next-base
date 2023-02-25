import React from 'react';

import { workDays, workDaysLabel } from 'config/constants/createProductDelivery';

import { WorkDays } from './styled';

const WorkTimeFormatter = ({ openingHours }) => {
  if (openingHours.length <= 0) {
    return null;
  }
  const groupedWorkDays = [
    {
      startTime: openingHours[0].startTime,
      endTime: openingHours[0].endTime,
      weekdays: [workDays.MONDAY],
    },
  ];
  for (let i = 1; i < openingHours.length; i += 1) {
    if (
      openingHours[i].endTime.hour === openingHours[i - 1].endTime.hour &&
      openingHours[i].startTime.hour === openingHours[i - 1].startTime.hour
    ) {
      groupedWorkDays[groupedWorkDays.length - 1].weekdays.push(openingHours[i].weekday);
    } else {
      groupedWorkDays.push({
        startTime: openingHours[i].startTime,
        endTime: openingHours[i].endTime,
        weekdays: [openingHours[i].weekday],
      });
    }
  }

  const formattedWordDays = groupedWorkDays.map(({ startTime, endTime, weekdays }, i) => (
    <span key={i}>
      {!!i && ' / '}
      {weekdays.length >= 2
        ? `${workDaysLabel[weekdays[0]]}-${workDaysLabel[weekdays[weekdays.length - 1]]}`
        : workDaysLabel[weekdays[0]]}
      &nbsp;
      {startTime.hour}:{`${startTime.minute}`.padStart(2, '0')}-{endTime.hour}:
      {`${endTime.minute}`.padStart(2, '0')}
      &nbsp;
    </span>
  ));

  return <WorkDays>{formattedWordDays}</WorkDays>;
};

export default WorkTimeFormatter;
