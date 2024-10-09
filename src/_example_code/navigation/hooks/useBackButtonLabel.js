import { useMultiMatch } from 'features/navigation';
import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { useGetCustomerQuery } from 'services/customersService';
import { useGetJobDetailsQuery } from 'services/jobsService';
import { isNil } from 'utils/helpers';
import { ROUTES } from '../navigation';

export function useBackButtonLabel({ mobile = false } = {}) {
  const location = useLocation();

  const routes = [
    ROUTES.changeOrders,
    ROUTES.customerChangeOrders,
    ROUTES.changeOrder,
    ROUTES.customerChangeOrder,
    ROUTES.customer,
    ROUTES.customerJob,
    ROUTES.customerJobs,
    ROUTES.estimate,
    // ROUTES.customerEstimate,
    ROUTES.estimateDocument,
    ROUTES.customerEstimateDocument,
    ROUTES.invoices,
    ROUTES.customerInvoices,
    ROUTES.invoice,
    ROUTES.customerInvoice,
    ROUTES.job,
    ROUTES.customerJob,
    ROUTES.payments,
    ROUTES.customerPayments,
    ROUTES.payment,
    ROUTES.customerPayment,
  ];

  const match = useMultiMatch(routes);

  const jobId = match?.params?.jobId || match?.params?.['*']?.split('/')[1];
  const customerId = match?.params?.customerId;

  const { data: jobDetails } = useGetJobDetailsQuery(
    { jobId },
    { skip: !jobId }
  );

  const { data: customer } = useGetCustomerQuery(
    { customerId },
    { skip: !customerId }
  );

  return useMemo(() => {
    let label = null;

    if (matchPath({ path: ROUTES.customer, end: false }, location.pathname)) {
      label = 'Customers';
    }

    if (
      matchPath({ path: ROUTES.customerJobs, end: false }, location.pathname)
    ) {
      label = `${customer?.last_name}, ${customer?.first_name}`;
    }

    if (
      matchPath({ path: ROUTES.customerJob, end: false }, location.pathname)
    ) {
      label = 'Jobs';
    }

    if (
      matchPath({ path: ROUTES.impersonate, end: false }, location.pathname)
    ) {
      label = 'Home';
    }

    const matchedRoutes = [
      ROUTES.changeOrders,
      ROUTES.customerChangeOrders,
      ROUTES.changeOrder,
      ROUTES.customerChangeOrder,
      ROUTES.estimate,
      ROUTES.customerEstimate,
      ROUTES.estimateDocument,
      ROUTES.customerEstimateDocument,
      ROUTES.invoices,
      ROUTES.customerInvoices,
      ROUTES.invoice,
      ROUTES.customerInvoice,
      ROUTES.payments,
      ROUTES.customerPayments,
      ROUTES.payment,
      ROUTES.customerPayment,
    ];

    if (
      matchedRoutes.some((route) =>
        matchPath({ path: route, end: false }, location.pathname)
      )
    ) {
      label = jobDetails?.name;
    }

    if (mobile) {
      if (
        (matchPath(
          { path: ROUTES.changeOrders, end: false },
          location.pathname
        ) &&
          matchPath(
            { path: ROUTES.changeOrder, end: false },
            location.pathname
          )) ||
        (matchPath(
          { path: ROUTES.customerChangeOrders, end: false },
          location.pathname
        ) &&
          matchPath(
            { path: ROUTES.customerChangeOrder, end: false },
            location.pathname
          ))
      ) {
        label = 'Change Orders';
      }

      if (
        (matchPath({ path: ROUTES.invoices, end: false }, location.pathname) &&
          matchPath({ path: ROUTES.invoice, end: false }, location.pathname)) ||
        (matchPath(
          { path: ROUTES.customerInvoices, end: false },
          location.pathname
        ) &&
          matchPath(
            { path: ROUTES.customerInvoice, end: false },
            location.pathname
          ))
      ) {
        label = 'Invoices';
      }

      if (
        (matchPath({ path: ROUTES.payments, end: false }, location.pathname) &&
          matchPath({ path: ROUTES.payment, end: false }, location.pathname)) ||
        (matchPath(
          { path: ROUTES.customerPayments, end: false },
          location.pathname
        ) &&
          matchPath(
            { path: ROUTES.customerPayment, end: false },
            location.pathname
          ))
      ) {
        label = 'Payments';
      }
    }

    if (label) {
      return label;
    }

    if (isNil(label)) {
      const pathSegments = location.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 1) {
        const segment = pathSegments[pathSegments.length - 2];
        return formatSegment(segment);
      }
    }

    return 'Home';
  }, [
    mobile,
    location.pathname,
    jobDetails?.id,
    jobDetails?.name,
    customer?.first_name,
    customer?.last_name,
    customer?.id,
  ]);
}

export function formatSegment(segment) {
  if (typeof segment !== 'string') return '';
  segment = segment.replace(/[-_]/g, ' ');
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}
