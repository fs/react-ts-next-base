import * as pages from 'config/routes';

const getVisitRuleFromPattern = (pagePattern: string) => {
  const pageName = Object.values(pages).find(page => page === pagePattern);
  return pageName ? `${pageName}-page:visit` : '';
};

// FIXME https://www.pivotaltracker.com/story/show/183769700
const visitPage = Object.entries(pages).reduce<Record<string, string>>(
  (acc, [name, pattern]) => ({ ...acc, [name]: getVisitRuleFromPattern(pattern) }),
  {},
);

const unauthorizedVisitRules = [
  visitPage.HOME,
  visitPage.ABOUT_US,
  visitPage.AUTH,
  visitPage.RESET_PASSWORD,
  visitPage.NEW_PASSWORD,
  visitPage.CATALOG,
  visitPage.PRODUCT,
  visitPage.COMPANY,
  visitPage.AGREEMENT,
  visitPage.CONTRACT,
  visitPage.COMPANIES_RATING,
  visitPage.COMPANIES_BLACK_LIST,
  visitPage.NEWS,
  visitPage.CART,
];

const guestVisitRules = [...unauthorizedVisitRules];

const clientVisitRules = [
  visitPage.ABOUT_US,
  visitPage.CATALOG,
  visitPage.PRODUCT,
  visitPage.COMPANY,
  visitPage.AGREEMENT,
  visitPage.CONTRACT,
  visitPage.COMPANIES_RATING,
  visitPage.COMPANIES_BLACK_LIST,
  visitPage.NEWS,
  visitPage.DASHBOARD,
  visitPage.DASHBOARD_CREATE_COMPANY,
  visitPage.DASHBOARD_COMPANY_INFO,
  visitPage.DASHBOARD_COMPANY_ADDRESSES,
  visitPage.DASHBOARD_COMPANY_CREATE_PRODUCT_DRAFT,
  visitPage.DASHBOARD_COMPANY_CREATE_PRODUCT,
  visitPage.DASHBOARD_COMPANY_PRODUCTS,
  visitPage.DASHBOARD_COMPANY_PRODUCT,
  visitPage.DASHBOARD_COMPANY_ORDERS,
  visitPage.DASHBOARD_COMPANY_ORDER,
  visitPage.DASHBOARD_COMPANY_ORDER_TRACKING,
  visitPage.DASHBOARD_COMPANY_OPEN_DISPUTE,
  visitPage.DASHBOARD_COMPANY_CREATE_DISPUTE_PROPOSAL,
  visitPage.DASHBOARD_COMPANY_CREATE_RETURNED_SHIPMENT,
  visitPage.DASHBOARD_COMPANY_REVIEWS,
  visitPage.EDIT_PROFILE,
  visitPage.FAVORITE_PRODUCTS,
  visitPage.CART,
  visitPage.DASHBOARD_COMPANY_NOTIFICATIONS,
  visitPage.DASHBOARD_COMPANY_RATING,
  visitPage.DASHBOARD_COMPANY_DOCUMENTS,
  visitPage.DASHBOARD_COMPANY_ORDER_DOCUMENTS,
  visitPage.DASHBOARD_COMPANY_CREATE_DEMAND,
  visitPage.DASHBOARD_COMPANY_ADVERTISEMENT,
  visitPage.DASHBOARD_COMPANY_ASSISTANT,
  visitPage.DASHBOARD_COMPANY_INSURANCE,
  visitPage.DASHBOARD_COMPANY_FINANCIAL_INSTRUMENTS,
  visitPage.DASHBOARD_COMPANY_TARIFF,
  visitPage.DASHBOARD_COMPANY_ANALYTICAL_ACCOUNT,
  visitPage.DASHBOARD_COMPANY_PENDING_ACCOUNT_OPERATIONS,
];

const adminVisitRules = [
  visitPage.HOME,
  visitPage.ADMIN_ACCOUNT,
  visitPage.ADMIN_REQUESTS,
  visitPage.ADMIN_REQUEST,
  visitPage.ADMIN_USERS,
  visitPage.ADMIN_USER,
  visitPage.ADMIN_COMPANIES,
  visitPage.ADMIN_COMPANY,
  visitPage.ADMIN_ANALYTICAL_ACCOUNT,
  visitPage.ADMIN_ANALYTICAL_ACCOUNT_DOCUMENTS,
  visitPage.ADMIN_PRODUCTS,
  visitPage.ADMIN_PRODUCT,
  visitPage.ADMIN_PRODUCT_CONFIRM,
  visitPage.ADMIN_PRIORITY_PRODUCTS,
  visitPage.ADMIN_REVIEWS,
  visitPage.ADMIN_ADDRESSES,
  visitPage.ADMIN_CHARACTERISTICS,
  visitPage.ADMIN_CHARACTERISTIC,
  visitPage.ADMIN_CATEGORIES,
  visitPage.ADMIN_CATEGORY,
  visitPage.ADMIN_ADDRESS,
  visitPage.ADMIN_DISPUTES,
  visitPage.ADMIN_DISPUTE,
  visitPage.ADMIN_ORDERS,
  visitPage.ADMIN_CREATE_DISPUTE_PROPOSAL,
];

const superAdminVisitRules = [
  ...adminVisitRules,
  visitPage.ADMIN_ADMINISTRATORS,
  visitPage.ADMIN_ADMINISTRATOR,
  visitPage.ADMIN_CREATE_ADMINISTRATOR,
];

export {
  unauthorizedVisitRules,
  guestVisitRules,
  clientVisitRules,
  adminVisitRules,
  superAdminVisitRules,
  getVisitRuleFromPattern,
};
