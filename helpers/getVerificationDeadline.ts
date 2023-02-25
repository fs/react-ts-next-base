import { differenceInHours } from 'date-fns';
import { noun, verb } from 'plural-ru';

export const getVerificationDeadline = (verificationDeadlineAt: string) => {
  const currentTime = new Date();
  const verificationTime = new Date(verificationDeadlineAt);
  const diffHours = differenceInHours(verificationTime, currentTime);
  const showHour = diffHours > 0 ? diffHours : 0;

  const leftText = verb(showHour, 'Остался', 'Осталось', 'Осталось');
  const hourText = noun(showHour, 'час', 'часа', 'часов');
  return `${leftText} ${showHour} ${hourText}`;
};
