import { matchPath, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { useGetCustomerQuery } from 'services/customersService';
import {
  useGetJobDetailsQuery,
  useGetInvoicesQuery,
  useGetChangeOrdersQuery,
  useGetJobPaymentsQuery,
} from 'services/jobsService';
import { hasValue, isNil } from 'utils/helpers';
import { ROUTES } from '../navigation';

export function useHeaderLabel({ mobile = false } = {}) {
  const location = useLocation();

  // Using matchPath to manually check the routes
  const match = (jobRoute, customerJobRoute) => {
    const jobMatch = matchPath(
      { path: jobRoute, end: false },
      location.pathname
    );
    if (jobMatch) return jobMatch;

    const customerJobMatch = matchPath(
      { path: customerJobRoute, end: false },
      location.pathname
    );
    return customerJobMatch;
  };

  const changeOrdersMatch = match(
    ROUTES.changeOrders,
    ROUTES.customerChangeOrders
  );
  const changeOrderMatch = match(
    ROUTES.changeOrder,
    ROUTES.customerChangeOrder
  );
  const customerMatch = matchPath(
    { path: ROUTES.customer, end: false },
    location.pathname
  );
  const customerJobsMatch = matchPath(
    { path: ROUTES.customerJobs, end: false },
    location.pathname
  );

  const estimateMatch = match(ROUTES.estimate, ROUTES.customerEstimate);
  const estimateDocumentMatch = match(
    ROUTES.estimateDocument,
    ROUTES.customerEstimateDocument
  );
  const invoicesMatch = match(ROUTES.invoices, ROUTES.customerInvoices);
  const invoiceMatch = match(ROUTES.invoice, ROUTES.customerInvoice);
  const jobMatch = match(ROUTES.job, ROUTES.customerJob);
  const paymentsMatch = match(ROUTES.payments, ROUTES.customerPayments);
  const paymentMatch = match(ROUTES.payment, ROUTES.customerPayment);

  const { data: jobDetails } = useGetJobDetailsQuery(
    { jobId: jobMatch?.params.jobId },
    { skip: !jobMatch?.params.jobId }
  );

  const { data: { data: invoices } = {} } = useGetInvoicesQuery(
    { jobId: jobMatch?.params.jobId },
    { skip: !jobMatch?.params.jobId }
  );

  const { data: { data: changeOrders } = {} } = useGetChangeOrdersQuery(
    { jobId: jobMatch?.params.jobId },
    { skip: !jobMatch?.params.jobId }
  );

  const { data: { data: payments } = {} } = useGetJobPaymentsQuery(
    { jobId: jobMatch?.params.jobId },
    { skip: !jobMatch?.params.jobId }
  );

  const { data: customer } = useGetCustomerQuery(
    { customerId: customerMatch?.params.customerId },
    { skip: !customerMatch?.params.customerId }
  );

  return useMemo(() => {
    const getHeaderForChangeOrders = () => {
      if (changeOrderMatch && hasValue(changeOrders) && mobile) {
        const changeOrder = changeOrders.find(
          (co) => co.id === changeOrderMatch.params.changeOrderId
        );
        if (changeOrder) {
          return changeOrder.name;
        } else {
          return 'Change Order';
        }
      } else {
        return 'Change Orders';
      }
    };

    const getHeaderForInvoices = () => {
      if (invoiceMatch && hasValue(invoices) && mobile) {
        const invoice = invoices.find(
          (inv) => inv.id === invoiceMatch.params.invoiceId
        );
        if (invoice) {
          return `#${invoice.invoiceNumber} ${invoice.invoiceType}`;
        } else {
          return 'Invoice';
        }
      } else {
        return 'Invoices';
      }
    };

    const getHeaderForPayments = () => {
      if (paymentMatch && hasValue(payments) && mobile) {
        const payment = payments.find(
          (p) => p.id === paymentMatch.params.paymentId
        );
        if (payment) {
          return `${payment.paymentType} ${payment.date}`;
        } else {
          return 'Payment';
        }
      } else {
        return 'Payments';
      }
    };

    if (changeOrdersMatch || changeOrderMatch) {
      return getHeaderForChangeOrders();
    } else if (estimateMatch || estimateDocumentMatch) {
      return 'Estimate';
    } else if (invoicesMatch) {
      return getHeaderForInvoices();
    } else if (paymentsMatch) {
      return getHeaderForPayments();
    } else if (jobMatch && !isNil(jobDetails?.name)) {
      return jobDetails.name;
    } else if (customerJobsMatch) {
      return 'Jobs';
    } else if (customerMatch && !isNil(customer?.id)) {
      return `${customer.last_name}, ${customer.first_name}`;
    }

    // Fallback for non-specific or root routes
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      return formatSegment(lastSegment);
    }

    return 'Home';
  }, [mobile, location.pathname, jobDetails?.id, customer?.id]);
}

export function formatSegment(segment) {
  if (typeof segment !== 'string') return '';
  segment = segment.replace(/[-_]/g, ' ');
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}
