import { makeVar } from '@apollo/client';

export const companySidebarVar = makeVar({ isShowFinances: true });
export const cityVar = makeVar(null);

const clientSideState = {
  companySidebar: {
    read() {
      return companySidebarVar();
    },
  },
  city: {
    read() {
      return cityVar();
    },
  },
};

export default clientSideState;
