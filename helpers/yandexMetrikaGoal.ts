import { YANDEX_METRIKA_ID } from 'config/vars';

export const yandexMetrikaGoal = (target: string) => {
  // @ts-ignore
  if (target && YANDEX_METRIKA_ID && ym) {
    // @ts-ignore
    ym(YANDEX_METRIKA_ID, 'reachGoal', target);
  }
};
