import { TTabParam } from 'components/shared/molecules/Tabs/types';

export type TAdminHeader = {
  title: string;
  activeId?: string;
  tabs?: TTabParam[];
};
