export const USN = 'USN';
export const OSN = 'OSN';

const taxationSystem = {
  [USN]: 'УСН',
  [OSN]: 'ОСН',
};

export const taxationSystems = [
  { value: USN, label: taxationSystem[USN] },
  { value: OSN, label: taxationSystem[OSN] },
];

export const getTaxationSystem = system => taxationSystem[system];
