// Public routes
export const HOME = '/';
export const ABOUT_US = '/about_us';
export const AUTH = '/auth';
export const RESET_PASSWORD = '/reset_password';
export const NEW_PASSWORD = '/reset_password/new';
export const CATALOG = '/catalog';
export const PRODUCT = '/product/[productId]';
export const COMPANY = '/company/[companyId]';
export const AGREEMENT = '/agreement';
export const CONTRACT = '/contract';
export const COMPANIES_RATING = '/rating';
export const COMPANIES_BLACK_LIST = '/black_list';
export const NEWS = '/news';

// User routes
export const DASHBOARD = '/dashboard';
export const DASHBOARD_CREATE_COMPANY = '/dashboard/create_company';
export const DASHBOARD_COMPANY_INFO = '/dashboard/company/[companyId]';
export const DASHBOARD_COMPANY_ADDRESSES = '/dashboard/company/[companyId]/addresses';
export const DASHBOARD_COMPANY_CREATE_PRODUCT_DRAFT =
  '/dashboard/company/[companyId]/products/draft';
export const DASHBOARD_COMPANY_CREATE_PRODUCT =
  '/dashboard/company/[companyId]/products/[productId]/draft';
export const DASHBOARD_COMPANY_PRODUCTS = '/dashboard/company/[companyId]/products';
export const DASHBOARD_COMPANY_PRODUCT = '/dashboard/company/[companyId]/products/[productId]';
export const DASHBOARD_COMPANY_ORDERS = '/dashboard/company/[companyId]/orders';
export const DASHBOARD_COMPANY_ORDER = '/dashboard/company/[companyId]/orders/[orderId]';
export const DASHBOARD_COMPANY_ORDER_TRACKING =
  '/dashboard/company/[companyId]/orders/[orderId]/tracking';
export const DASHBOARD_COMPANY_OPEN_DISPUTE =
  '/dashboard/company/[companyId]/orders/[orderId]/open_dispute';
export const DASHBOARD_COMPANY_CREATE_DISPUTE_PROPOSAL =
  '/dashboard/company/[companyId]/orders/[orderId]/create_dispute_proposal';
export const DASHBOARD_COMPANY_CREATE_RETURNED_SHIPMENT =
  '/dashboard/company/[companyId]/orders/[orderId]/create_returned_shipment';
export const DASHBOARD_COMPANY_REVIEWS = '/dashboard/company/[companyId]/reviews';
export const DASHBOARD_COMPANY_NOTIFICATIONS = '/dashboard/company/[companyId]/notifications';
export const DASHBOARD_COMPANY_RATING = '/dashboard/company/[companyId]/rating';
export const DASHBOARD_COMPANY_DOCUMENTS = '/dashboard/company/[companyId]/documents';
export const DASHBOARD_COMPANY_ORDER_DOCUMENTS =
  '/dashboard/company/[companyId]/documents/[orderId]';
export const DASHBOARD_COMPANY_CREATE_DEMAND = '/dashboard/company/[companyId]/demand';
export const DASHBOARD_COMPANY_ADVERTISEMENT = '/dashboard/company/[companyId]/advertisement';
export const DASHBOARD_COMPANY_ASSISTANT = '/dashboard/company/[companyId]/assistant';
export const DASHBOARD_COMPANY_INSURANCE = '/dashboard/company/[companyId]/insurance';
export const DASHBOARD_COMPANY_FINANCIAL_INSTRUMENTS =
  '/dashboard/company/[companyId]/financial_instruments';
export const DASHBOARD_COMPANY_TARIFF = '/dashboard/company/[companyId]/tariff';
export const DASHBOARD_COMPANY_ANALYTICAL_ACCOUNT =
  '/dashboard/company/[companyId]/analytical_account';
export const DASHBOARD_COMPANY_PENDING_ACCOUNT_OPERATIONS =
  '/dashboard/company/[companyId]/pending_account_operations';
export const EDIT_PROFILE = '/profile';
export const FAVORITE_PRODUCTS = '/favorites';
export const CART = '/cart';

// Admin routes
export const ADMIN_ACCOUNT = '/admin';
export const ADMIN_REQUESTS = '/admin/requests';
export const ADMIN_REQUEST = '/admin/requests/[companyId]';
export const ADMIN_USERS = '/admin/users';
export const ADMIN_USER = '/admin/users/[userId]';
export const ADMIN_COMPANIES = '/admin/companies';
export const ADMIN_COMPANY = '/admin/companies/[companyId]';
export const ADMIN_ADMINISTRATORS = '/admin/administrators';
export const ADMIN_ADMINISTRATOR = '/admin/administrators/[adminId]';
export const ADMIN_CREATE_ADMINISTRATOR = '/admin/create_administrator';
export const ADMIN_ANALYTICAL_ACCOUNT = '/admin/analytical_account';
export const ADMIN_ANALYTICAL_ACCOUNT_DOCUMENTS = '/admin/analytical_account/documents/[type]/[id]';
export const ADMIN_PRODUCTS = '/admin/products';
export const ADMIN_PRODUCT = '/admin/products/[productId]';
export const ADMIN_PRODUCT_CONFIRM = '/admin/products/[productId]/confirm';
export const ADMIN_PRIORITY_PRODUCTS = '/admin/priority_products';
export const ADMIN_REVIEWS = '/admin/reviews';
export const ADMIN_ADDRESSES = '/admin/addresses';
export const ADMIN_ADDRESS = '/admin/addresses/[addressId]';
export const ADMIN_CATEGORIES = '/admin/categories';
export const ADMIN_CATEGORY = '/admin/categories/[categoryId]';
export const ADMIN_CHARACTERISTICS = '/admin/characteristics';
export const ADMIN_CHARACTERISTIC = '/admin/characteristics/[propertyId]';
export const ADMIN_DISPUTES = '/admin/disputes';
export const ADMIN_DISPUTE = '/admin/disputes/[orderId]';
export const ADMIN_CREATE_DISPUTE_PROPOSAL = '/admin/disputes/[orderId]/create_dispute_proposal';
export const ADMIN_ORDERS = '/admin/orders';
