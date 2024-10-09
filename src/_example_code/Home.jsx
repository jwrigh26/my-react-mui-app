import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoadingPage from 'components/Skeleton/LoadingRibbonSkeleton';
import {
  ROUTES as ADD_COMPANY_ROUTES,
  handleAddCompanyCard,
  handleAddCompanyInformation,
  handleAddCompanyPlans,
  handleResetState,
} from 'features/company';
import { MainRibbon } from 'features/navigation';
import DesktopDrawerLayout from 'layouts/DesktopLayout';
import MobileRibbonLayout from 'layouts/MobileLayout';
import { deferLoading, loadInitialAppData } from 'lib/router';
import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { jobsApi } from 'services/jobsService';
import { dispatchEndpoint } from 'utils/api';

export async function loader(store, routeData) {
  const loadDeferredData = async () => {
    const { selectedCompany, user } = await loadInitialAppData(store);
    prefetchJobs(store, selectedCompany, user);
    return {
      ...routeData,
      selectedCompany,
      user,
    };
  };
  return deferLoading(store, routeData, loadDeferredData);
}

export function Component() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const data = useLoaderData() ?? {};

  return (
    <Suspense fallback={<LoadingPage mobile={isMobile} />}>
      <Await resolve={data.root}>
        {(root) => {
          return (
            <>
              {isMobile && <MobileHome />}
              {!isMobile && <DesktopHome root={root} />}
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

Component.displayName = 'Home';

function DesktopHome({ root: _root }) {
  return <DesktopDrawerLayout ribbon={<MainRibbon />} />;
}

DesktopHome.propTypes = {
  root: PropTypes.object,
};

function MobileHome({ root: _root }) {
  return (
    <MobileRibbonLayout>
      <MainRibbon />
    </MobileRibbonLayout>
  );
}

MobileHome.propTypes = {
  root: PropTypes.object,
};

function prefetchJobs(store, selectedCompany, user) {
  const { customer_id: customerId } = user ?? {};
  const { currency_code: currencyCode, ensembles_id: ensemblesId } =
    selectedCompany ?? {};
  return dispatchEndpoint(store, jobsApi.endpoints.getJobs, {
    currencyCode,
    customerId: customerId || '',
    ensemblesId,
  });
}

// Private Index Actions
// This is the place for actions to be handled
// When they are not directly related to a specific page
export async function action(store, { request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');

  let result = { success: false, error: null };
  switch (intent) {
    case ADD_COMPANY_ROUTES.RESET:
      result = await handleResetState(store);
      break;
    case ADD_COMPANY_ROUTES.PLANS:
      result = handleAddCompanyPlans(store, formData);
      break;
    case ADD_COMPANY_ROUTES.INFO:
      result = await handleAddCompanyInformation(store, formData);
      break;
    case ADD_COMPANY_ROUTES.CARD:
      result = await handleAddCompanyCard(store, formData);
      break;

    default:
      break;
  }

  return result;
}
