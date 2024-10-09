import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DesktopToolbar, MobileToolbar } from 'features/navigation';
import PropTypes from 'prop-types';

export default function Layout({ children, sos: isSos }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Clear console on hot reload
  // if (import.meta.hot) {
  //   import.meta.hot.accept();
  //   console.clear();
  // }

  return (
    <>
      {isMobile && <MobileToolbar isPublic sos={isSos} />}
      {!isMobile && <DesktopToolbar isPublic sos={isSos} />}
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
  sos: PropTypes.bool,
};
