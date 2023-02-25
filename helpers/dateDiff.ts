import { differenceInHours, differenceInDays, differenceInMinutes } from 'date-fns';
import { noun } from 'plural-ru';

type TDateDiff = {
  start: Date;
  end: Date;
};

export const dateDiff = ({ start, end }: TDateDiff) => {
  const diffDays = differenceInDays(end, start);
  const diffHours = differenceInHours(end, start) % 24;
  const diffMinutes = differenceInMinutes(end, start) % 60;

  const daysText = noun(diffDays, '%d день', '%d дня', '%d дней');
  const hourText = noun(diffHours, '%d час', '%d часа', '%d часов');
  const minuteText = noun(diffMinutes, '%d минута', '%d минуты', '%d минут');

  if (diffDays > 0) {
    return diffHours > 0 ? `${daysText} ${hourText}` : daysText;
  }

  if (diffHours > 0) {
    return diffMinutes > 0 ? `${hourText} ${minuteText}` : hourText;
  }

  return diffMinutes >= 0 ? minuteText : '0 минут';
};
