const host = "113.182.61.208"; //`113.182.61.208`;

const SIGNUP_URL = `http://${host}:8000/signup`;
const SIGNUP_STAFF_URL = `http://${host}:8000/add-staff`;
const UPDATE_STAFF_URL = `http://${host}:8000/update-staff`;
const UPDATE_CUSTOMER_URL = `http://${host}:8000/update-customer`;
const LOGIN_URL = `http://${host}:8000/login`;
const AUTH_URL = `http://${host}:8000/authen`;
const LOGIN_FB_URL = `http://${host}:8000/fb-login`;
const USER_URL = `http://${host}:8000/get-user`;

const FORGET_PASSWORD_URL = `http://${host}:8000/forget-password`;
const AUTH_FORGOT_CODE_URL = `http://${host}:8000/auth-forgot-code`;
const CHANGE_PASSWORD_URL = `http://${host}:8000/change-password`;

const MSG_BY_ROOM_URL = `http://${host}:8000/messages_by_room`;
const MSG_LIST_BY_USER_URL = `http://${host}:8000/message_list_by_user`;
const CONTACT_USER_URL = `http://${host}:8000/contact_user`;
const CUSTOMER_ROOM_URL = `http://${host}:8000/customer_room`;
const MSG_LIST_ALL = `http://${host}:8000/message_list_all`;
const DROP_ROOM_URL = `http://${host}:8000/drop_room`;
const UPDATE_ONLINE_URL = `http://${host}:8000/update_online`;
const USERS_URL = `http://${host}:8000/users`;
const DELETE_USER_URL = `http://${host}:8000/delete-user`;
const ADMIN_TYPE_USER_URL = `http://${host}:8000/admin_type_user`;
const SEARCH_USER_URL = `http://${host}:8000/search-user`;
const LOCK_USER_URL = `http://${host}:8000/lock-user`;

const CATEGORY_URL = `http://${host}:8000/category`;
const ADD_CATEGORY_URL = `http://${host}:8000/add-category`;
const UPDATE_CATEGORY_URL = `http://${host}:8000/update-category`;
const DELETE_CATEGORY_URL = `http://${host}:8000/delete-category`;
const CATEGORY_CHILDREN_URL = `http://${host}:8000/category-children`;
const SEARCH_CATEGORY_URL = `http://${host}:8000/search-category`;

const PRODUCT_URL = `http://${host}:8000/product`;
const MAIN_PRODUCT_URL = `http://${host}:8000/main-product`;
const ADD_PRODUCT_URL = `http://${host}:8000/add-product`;
const UPDATE_PRODUCT_URL = `http://${host}:8000/update-product`;
const DELETE_PRODUCT_URL = `http://${host}:8000/delete-product`;
const SEARCH_PRODUCT_URL = `http://${host}:8000/search-product`;
const TOP_PRODUCT_URL = `http://${host}:8000/top-products`;
const PRODUCT_BY_ID_URL = `http://${host}:8000/product-by-id`;

const DETAIL_PRODUCT_URL = `http://${host}:8000/detail_product`;
const ADD_DETAIL_PRODUCT_URL = `http://${host}:8000/add-detail_product`;
const UPDATE_DETAIL_PRODUCT_URL = `http://${host}:8000/update-detail_product`;
const DELETE_DETAIL_PRODUCT_URL = `http://${host}:8000/delete-detail_product`;
const SEARCH_DETAIL_PRODUCT_URL = `http://${host}:8000/search-detail_product`;

const BRAND_URL = `http://${host}:8000/brand`;
const ADD_BRAND_URL = `http://${host}:8000/add-brand`;
const UPDATE_BRAND_URL = `http://${host}:8000/update-brand`;
const DELETE_BRAND_URL = `http://${host}:8000/delete-brand`;
const SEARCH_BRAND_URL = `http://${host}:8000/search-brand`;

const MYSQL_LOGIN_URL = `http://${host}:8000/mysql-login`;
const GET_TABLE_URL = `http://${host}:8000/get_table`;
const GET_COLUMN_URL = `http://${host}:8000/get_column`;

const HORIZON_MIGRATE = `http://${host}:8000/migrate`;

const STORAGE_URL = `http://${host}:8000/storage`;

const BRANCH_URL = `http://${host}:8000/branch`;

const ADD_CART_URL = `http://${host}:8000/add-cart`;
const UPDATE_CART_URL = `http://${host}:8000/update-cart`;
const GET_CART_URL = `http://${host}:8000/get-cart`;

const GET_BILL_URL = `http://${host}:8000/get-bill`;
const UPDATE_STATEMENT_BILL_URL = `http://${host}:8000/update-statement-bill`;
const UPDATE_PAYED_BILL_URL = `http://${host}:8000/update-payed-bill`;
const SEARCH_BILL_URL = `http://${host}:8000/search-bill`;
const CHECKOUT_URL = `http://${host}:8000/checkout`;
const GET_BILL_USER_NAME_URL = `http://${host}:8000/get-bill-by-username`;
const GET_DETAIL_BILL = `http://${host}:8000/get-detail_bill`;
const SORT_BILL_URL = `http://${host}:8000/sort-bill`;

const RATE_URL = `http://${host}:8000/get-rate`;
const ADD_RATE_URL = `http://${host}:8000/add-rate`;
const SEARCH_RATE_URL = `http://${host}:8000/search-rate`;
const UPDATE_RATE_URL = `http://${host}:8000/update-rate`;

const REVENUE_DURATION_URL = `http://${host}:8000/revenue-duration`;
const REVENUE_MONTH_URL = `http://${host}:8000/revenue-month`;
const TOP_PRODUCTS_BY_YEAR_URL = `http://${host}:8000/products-year`;

export {
  LOGIN_URL,
  SIGNUP_URL,
  AUTH_URL,
  MSG_BY_ROOM_URL,
  MSG_LIST_BY_USER_URL,
  CONTACT_USER_URL,
  CUSTOMER_ROOM_URL,
  MSG_LIST_ALL,
  DROP_ROOM_URL,
  SIGNUP_STAFF_URL,
  UPDATE_ONLINE_URL,
  USERS_URL,
  DELETE_USER_URL,
  ADMIN_TYPE_USER_URL,
  UPDATE_STAFF_URL,
  SEARCH_USER_URL,
  CATEGORY_URL,
  ADD_CATEGORY_URL,
  UPDATE_CATEGORY_URL,
  DELETE_CATEGORY_URL,
  CATEGORY_CHILDREN_URL,
  SEARCH_CATEGORY_URL,
  PRODUCT_URL,
  ADD_PRODUCT_URL,
  UPDATE_PRODUCT_URL,
  DELETE_PRODUCT_URL,
  SEARCH_PRODUCT_URL,
  BRAND_URL,
  ADD_BRAND_URL,
  UPDATE_BRAND_URL,
  DELETE_BRAND_URL,
  MYSQL_LOGIN_URL,
  LOGIN_FB_URL,
  DETAIL_PRODUCT_URL,
  ADD_DETAIL_PRODUCT_URL,
  UPDATE_DETAIL_PRODUCT_URL,
  DELETE_DETAIL_PRODUCT_URL,
  SEARCH_DETAIL_PRODUCT_URL,
  GET_TABLE_URL,
  GET_COLUMN_URL,
  HORIZON_MIGRATE,
  STORAGE_URL,
  BRANCH_URL,
  TOP_PRODUCT_URL,
  ADD_CART_URL,
  GET_CART_URL,
  UPDATE_CART_URL,
  GET_BILL_URL,
  UPDATE_STATEMENT_BILL_URL,
  SEARCH_BILL_URL,
  CHECKOUT_URL,
  GET_BILL_USER_NAME_URL,
  GET_DETAIL_BILL,
  UPDATE_PAYED_BILL_URL,
  SORT_BILL_URL,
  SEARCH_BRAND_URL,
  PRODUCT_BY_ID_URL,
  MAIN_PRODUCT_URL,
  RATE_URL,
  ADD_RATE_URL,
  SEARCH_RATE_URL,
  UPDATE_RATE_URL,
  FORGET_PASSWORD_URL,
  AUTH_FORGOT_CODE_URL,
  CHANGE_PASSWORD_URL,
  LOCK_USER_URL,
  REVENUE_DURATION_URL,
  REVENUE_MONTH_URL,
  TOP_PRODUCTS_BY_YEAR_URL,
  UPDATE_CUSTOMER_URL,
  USER_URL,
  host,
};
