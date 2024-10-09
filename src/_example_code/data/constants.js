/**
 * This config is populated via webpack using environment variables. (see webpack configs)
 */
export const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
export const awsUrl = import.meta.env.VITE_REACT_APP_AWS_URL;
export const billingAppUrl = import.meta.env.VITE_REACT_APP_BILLING_APP_URL;
export const marketingSiteUrl = import.meta.env
  .VITE_REACT_APP_MARKETING_SITE_URL;
export const stripeConnectClientId = import.meta.env
  .VITE_REACT_APP_STRIPE_CONNECT_CLIENT_ID;
export const stripePublishableKey = import.meta.env
  .VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY;
export const sentryDsn = import.meta.env.VITE_REACT_APP_SENTRY_DSN;

export const COMPONENT_KEYS = Object.freeze({
  ADD_COMPANY_MODAL: 'ADD_COMPANY_MODAL',
  COMPANY_DRAWER: 'COMPANY_DRAWER',
  OPTIONS_DRAWER: 'OPTIONS_DRAWER',
  CREDITCARD_DRAWER: 'CREDITCARD_DRAWER',
  SIGNOUT_MODAL: 'SIGNOUT_MODAL',
  RECEIPT_MODAL: 'RECEIPT_MODAL',
  APPLE_CANCEL_ERROR_SHEET: 'APPLE_CANCEL_ERROR_SHEET',
  APPLE_CANCEL_SUCCESS_SHEET: 'APPLE_CANCEL_SUCCESS_SHEET',
  ADD_CARD_SHEET: 'ADD_CARD_SHEET',
  SUBSCRIPTION_MODAL: 'SUBSCRIPTION_MODAL',
  CANCEL_SUBSCRIPTION_MODAL: 'CANCEL_SUBSCRIPTION_MODAL',
  PUBLIC_DRAWER: 'PUBLIC_DRAWER',
  PUBLIC_ACCOUNT: 'PUBLIC_ACCOUNT',
});

export const FORM_IDS = {
  USER_EMAIL: 'USER_EMAIL',
  USER_PASSWORD: 'USER_PASSWORD',
};
