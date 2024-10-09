import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoadingPage from 'components/Skeleton/LoadingRibbonSkeleton';
import { DesktopToolbar, MobileToolbar } from 'features/navigation';

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      {isMobile && <MobileLayout />}
      {!isMobile && <DesktopLayout />}
    </>
  );
}

function DesktopLayout() {
  return (
    <>
      <DesktopToolbar isPublic />
      <LoadingPage />
    </>
  );
}

function MobileLayout() {
  return (
    <>
      <MobileToolbar isPublic />
      <LoadingPage mobile />
    </>
  );
}
