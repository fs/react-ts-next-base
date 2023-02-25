import {
  createCompanyRule,
  destroyCompanyRule,
  addCompanyMemberRule,
  destroyCompanyMemberRule,
  replenishmentAccountRule,
  withdrawalAccountRule,
  showAdministratorsRule,
  unauthorizedVisitRules,
  guestVisitRules,
  clientVisitRules,
  adminVisitRules,
  superAdminVisitRules,
} from './rules';
import { TRole } from './types';

const rules: {
  [key in TRole]: { static: string[] };
} = {
  owner: {
    static: [
      createCompanyRule,
      destroyCompanyRule,
      addCompanyMemberRule,
      destroyCompanyMemberRule,
      replenishmentAccountRule,
      withdrawalAccountRule,
    ],
  },
  employee: {
    static: [],
  },
  UNAUTHORIZED: {
    static: [...unauthorizedVisitRules],
  },
  GUEST: {
    static: [...guestVisitRules],
  },
  CLIENT: {
    static: [...clientVisitRules],
  },
  ADMIN: {
    static: [...adminVisitRules],
  },
  SUPERADMIN: {
    static: [...superAdminVisitRules, showAdministratorsRule],
  },
};

export default rules;
