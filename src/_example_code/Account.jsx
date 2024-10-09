import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from 'components/Buttons/SendButton';
import DeferredErrorHandler from 'components/DeferredErrorHandler';
import PageHeader from 'components/PageHeader';
import LoadingRibbon from 'components/Skeleton/LoadingRibbonSkeleton';
import { MainRibbon } from 'features/navigation';
import DesktopDrawerLayout from 'layouts/DesktopLayout';
import MobileRibbonLayout from 'layouts/MobileLayout';
import Page from 'layouts/PublicPageLayout';
import { selectUser } from 'lib/store/userSlice';
import PropTypes from 'prop-types';
import { Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import { Await, useLoaderData } from 'react-router-dom';
import { useSendEmailMutation } from 'services/rootService';
import { sleep } from 'utils/helpers';
import { useErrorSnackbar, useSuccessSnackbar } from '../hooks/useSnackbar';

export function Component() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const data = useLoaderData() ?? {};

  return (
    <Suspense fallback={<LoadingRibbon mobile={isMobile} />}>
      <Await
        resolve={data.root}
        errorElement={<DeferredErrorHandler root={data.root} />}
      >
        {(root) => {
          return (
            <>
              {isMobile && <MobileAccountInfo />}
              {!isMobile && <DesktopAccountInfo root={root} />}
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

Component.displayName = 'Downloads';

function DesktopAccountInfo({ root: _root }) {
  return (
    <DesktopDrawerLayout name="Downloads" ribbon={<MainRibbon />}>
      <AccountInfo />
    </DesktopDrawerLayout>
  );
}

DesktopAccountInfo.propTypes = {
  root: PropTypes.object,
};

function MobileAccountInfo({ root: _root }) {
  return (
    <MobileRibbonLayout name="Downloads" ribbon={<MainRibbon />}>
      <AccountInfo mobile />
    </MobileRibbonLayout>
  );
}

MobileAccountInfo.propTypes = {
  root: PropTypes.object,
};

function AccountInfo({ mobile: isMobile }) {
  const [isSending, setIsSending] = useState(false);
  const { email, first_name, last_name } = useSelector(selectUser) ?? {};
  const name = `${first_name} ${last_name}`;
  const buttonText = isMobile ? 'Send Email' : 'Send Change Password Email';
  const [sendEmail] = useSendEmailMutation();

  const setSuccessSnackbar = useSuccessSnackbar();
  const setErrorSnackbar = useErrorSnackbar();

  const handleSendEmail = async () => {
    try {
      setIsSending(true);
      // Send email
      await sleep(1000);
      await sendEmail({ email });
      setSuccessSnackbar('Email sent successfully');
    } catch (error) {
      // Handle error
      setErrorSnackbar('An error occurred while sending the email');
    } finally {
      setIsSending(false);
    }
  };
  return (
    <Page>
      <PageHeader mobile={isMobile}>Account</PageHeader>
      <Stack
        gap={2}
        direction={{ md: 'row' }}
        sx={{ mt: { xs: 1, sm: 4 }, width: '100%' }}
      >
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="subtitle2" sx={{ flex: 1, pb: 1 }}>
              User
            </Typography>
            <Stack gap={{ xs: 2, sm: 1 }}>
              <InfoRow>
                <Typography
                  variant="body2"
                  sx={{ width: 56, color: 'text.secondary' }}
                >
                  Name:
                </Typography>
                <Typography variant="body2" sx={{ flex: 1 }}>
                  {name}
                </Typography>
              </InfoRow>
              <InfoRow>
                <Typography
                  variant="body2"
                  sx={{ width: 56, color: 'text.secondary' }}
                >
                  Email:
                </Typography>
                <Typography variant="body2" sx={{ flex: 1 }}>
                  {email}
                </Typography>
              </InfoRow>
            </Stack>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Stack gap={1}>
              <Typography variant="subtitle2" sx={{ flex: 1 }}>
                Password
              </Typography>
              <Typography variant="body2" sx={{ flex: 1, pb: 1 }}>
                If you wish to change your password an email can be sent with
                instructions.
              </Typography>
              <Stack direction="row">
                <Button
                  loading={isSending}
                  fullWidth={isMobile}
                  onClick={handleSendEmail}
                  secondary
                >
                  {buttonText}
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Page>
  );
}

AccountInfo.propTypes = {
  mobile: PropTypes.bool,
};

// ##########################################
// ### Styled Components
// ##########################################

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));
