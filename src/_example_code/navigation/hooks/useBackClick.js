import { useTransition } from 'hooks/useTransition';
import { useComponentStateContext } from 'providers/ComponentStateProvider';
import { useCallback } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../navigation';

export function useBackClick({ mobile = false } = {}) {
  const { setPageNavigationDirection } = useTransition();
  const { setTransitioning, state } = useComponentStateContext();
  const navigate = useNavigate();
  const location = useLocation();

  const match = (path) => matchPath({ path, end: false }, location.pathname);

  // Customers
  const changeOrderCustomerMatch = match(ROUTES.customerChangeOrder);
  const estimateCustomerMatch = match(ROUTES.customerEstimate);
  const estimateDocumentCustomerMatch = match(ROUTES.customerEstimateDocument);
  const invoiceCustomerMatch = match(ROUTES.customerInvoice);
  const paymentCustomerMatch = match(ROUTES.customerPayment);

  // Jobs
  const changeOrderMatch = match(ROUTES.changeOrder);
  const estimateMatch = match(ROUTES.estimate);
  const estimateDocumentMatch = match(ROUTES.estimateDocument);
  const invoiceMatch = match(ROUTES.invoice);
  const payementMatch = match(ROUTES.payment);

  // Admin
  const impersonateMatch = match(ROUTES.impersonate);

  const handleOnClick = useCallback(
    () => () => {
      if (!state.transitioning) {
        setTransitioning(true);
        setPageNavigationDirection('page-back');

        if (estimateCustomerMatch) {
          return navigate(
            `/customers/${estimateCustomerMatch.params.customerId}/jobs/${estimateCustomerMatch.params.jobId}`
          );
        }

        if (!mobile && estimateDocumentCustomerMatch) {
          return navigate(
            `/customers/${estimateDocumentCustomerMatch.params.customerId}/jobs/${estimateDocumentCustomerMatch.params.jobId}`
          );
        }

        if (!mobile && invoiceCustomerMatch) {
          return navigate(
            `/customers/${invoiceCustomerMatch.params.customerId}/jobs/${invoiceCustomerMatch.params.jobId}`
          );
        }

        if (!mobile && changeOrderCustomerMatch) {
          return navigate(
            `/customers/${changeOrderCustomerMatch.params.customerId}/jobs/${changeOrderCustomerMatch.params.jobId}`
          );
        }

        if (!mobile && paymentCustomerMatch) {
          return navigate(
            `/customers/${paymentCustomerMatch.params.customerId}/jobs/${paymentCustomerMatch.params.jobId}`
          );
        }

        if (estimateDocumentMatch) {
          return navigate(`/jobs/${estimateDocumentMatch.params.jobId}`);
        }

        if (!mobile && estimateMatch) {
          return navigate(`/jobs`);
        }

        if (!mobile && invoiceMatch) {
          return navigate(`/jobs/${invoiceMatch.params.jobId}`);
        }

        if (!mobile && changeOrderMatch) {
          return navigate(`/jobs/${changeOrderMatch.params.jobId}`);
        }

        if (!mobile && payementMatch) {
          return navigate(`/jobs/${payementMatch.params.jobId}`);
        }

        if (impersonateMatch) {
          return navigate('/');
        }

        // For mobile, navigate to a more general route
        const pathSegments = location.pathname.split('/');
        pathSegments.pop(); // Remove the last segment
        let previousPath = pathSegments.join('/') || '/';
        return navigate(previousPath);
      }
    },
    [state]
  );

  return handleOnClick;
}
