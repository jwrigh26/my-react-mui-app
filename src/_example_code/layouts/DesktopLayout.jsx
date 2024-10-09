import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  DesktopBackButton as BackButton,
  useBackButtonLabel,
  useBackClick,
  useHeaderLabel,
} from 'features/navigation';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// Note: this layout assumes the parent is using display: flex.
// If not, the page falls behind the drawer.
// The parent should be PrivateIndexLayout: DesktopLayout
const drawerWidth = 320;

export default function DesktopDrawerLayout({ children, ribbon }) {
  const { pathname } = useLocation();
  const backButtonLabel = useBackButtonLabel();
  const headerLabel = useHeaderLabel();
  const handleOnClick = useBackClick();
  const shouldHideButton = pathname === '/home' || pathname === '/';

  return (
    <>
      <NavigationDrawer
        id="navigation-drawer"
        variant="permanent"
        anchor="left"
        className="ribbon"
      >
        <Toolbar />
        <NavigationHeader>
          {shouldHideButton && <NoButtonSpacer />}
          {!shouldHideButton && (
            <BackButton onClick={handleOnClick(pathname)}>
              {backButtonLabel}
            </BackButton>
          )}
          <Header rightEdge={!shouldHideButton}>{headerLabel}</Header>
        </NavigationHeader>
        <Divider flexItem />
        {ribbon}
      </NavigationDrawer>
      <Layout id="layout">
        <Toolbar />
        {children}
      </Layout>
    </>
  );
}

DesktopDrawerLayout.propTypes = {
  children: PropTypes.any,
  ribbon: PropTypes.element,
};

// ##########################################
// ### Styled Components
// ##########################################

const NavigationDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    border: 'none',
    boxSizing: 'border-box',
    overflowX: 'clip',
  },
}));

const Layout = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.grey.light,
  width: '100%',
  height: '100svh',
  position: 'relative',
  zIndex: theme.zIndex.drawer + 1,
  flexGrow: 1,
}));

export const NavigationHeader = styled((props) => (
  <Stack
    direction="column"
    alignItems="flex-start"
    justifyContent="center"
    spacing={0}
    {...props}
  />
))(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(2),
  height: '54px',
  maxHeight: '54px',
}));

export const Header = styled(
  (props) => <Typography variant="subtitle2" {...props} />,
  { shouldForwardProp: (prop) => prop !== 'rightEdge' }
)(({ theme, rightEdge }) => ({
  overflow: 'hidden',
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightBold,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '28ch',
  paddingLeft: rightEdge ? theme.spacing(1.5) : 0,
}));

const NoButtonSpacer = styled(Box)(() => ({
  width: '1px',
  height: '28px',
}));
