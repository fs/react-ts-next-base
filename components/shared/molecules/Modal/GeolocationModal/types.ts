export enum EStep {
  ACCEPT_LOCATION = 'ACCEPT_LOCATION',
  CHOOSE_LOCATION = 'CHOOSE_LOCATION',
}

type TCity = { id: string; name: string };

type TInitialOption = { value: string; label: string };

export type TGeolocationModal = {
  setCity: (city: TCity) => void;
  initialStep: EStep;
  initialValue: TInitialOption;
};
