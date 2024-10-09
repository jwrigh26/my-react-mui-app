import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { marketingSiteUrl } from 'data/constants';
import { DesktopToolbar, MobileToolbar } from 'features/navigation';
import { useTransition } from 'hooks/useTransition';
import PropTypes from 'prop-types';
import { useComponentStateContext } from 'providers/ComponentStateProvider';
import { useCallback } from 'react';
import { Link, matchPath, useLocation, useOutlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { sleep } from '../utils/helpers';
import './transitions.css'; // Import your CSS transitions

/**
 * Transition Process:
 *
 * Both Mobile and Desktop layouts are assigned an id: 'navigation'. This id is crucial as the useNavigationContext function uses it to identify the element.
 *
 * The TransitionGroup component wraps the CSSTransition component. The classNames prop of CSSTransition is set to either 'desktop-transition' or 'mobile-transition' based on the layout.
 *
 * The actual animation for the transition is defined in the imported ./transitions.css file. However, due to the complexity of the transitions, the animation is not directly linked to the classNames. Instead, the element with id 'navigation' is assigned a class of either 'page-forward' or 'page-back'.
 *
 * Depending on whether the class is 'page-forward' or 'page-back', a corresponding mobile or desktop animation is applied.
 *
 * The 'navigation' id is used inside the useNavigationContext function and is updated whenever setPageClassName is called. Typically, it's set to 'page-forward', but when the BackButton (ToolbarBackButton or BackButton in DesktopDrawerLayout) is clicked, it's updated to 'page-back'.
 *
 * Once the transition completes, the onExited callback is triggered, resetting the pageClassName to 'page-forward'.
 */
export default function Layout({ routes }) {
  // Clear console on hot reload
  // if (import.meta.hot) {
  //   import.meta.hot.accept();
  //   console.clear();
  // }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      {isMobile && <MobileLayout routes={routes} />}
      {!isMobile && <DesktopLayout routes={routes} />}
    </>
  );
}

Layout.propTypes = {
  routes: PropTypes.array,
};

// ##########################################
// ### Desktop
// ##########################################

function DesktopLayout({ routes }) {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const matchingRoute = findRouteByPathname(location.pathname, routes);
  const { enableTransitionAnimation, setPageNavigationDirection } =
    useTransition();
  const { setTransitioning } = useComponentStateContext();

  const handleOnExit = useCallback(async () => {
    await sleep(300);
    setPageNavigationDirection('page-forward');
    enableTransitionAnimation();
    setTransitioning(false);
  }, []);

  const nodeRef = matchingRoute ? matchingRoute.nodeRef : null;

  return (
    <>
      <DesktopToolbar />
      <Box id="navigation" className="layout page-forward">
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            nodeRef={nodeRef}
            timeout={300}
            unmountOnExit
            classNames="desktop-transition"
            onExited={handleOnExit}
          >
            <Box
              className="desktop-transition"
              ref={nodeRef}
              sx={{ position: 'relative', display: 'flex' }}
            >
              {currentOutlet}
            </Box>
          </CSSTransition>
        </TransitionGroup>
      </Box>
      {/* <Footer /> */}
    </>
  );
}

DesktopLayout.propTypes = {
  routes: PropTypes.array,
};

// ##########################################
// ### Mobile
// ##########################################

function MobileLayout({ routes }) {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const matchingRoute = findRouteByPathname(location.pathname, routes);
  const { setPageNavigationDirection } = useTransition();
  const { setTransitioning } = useComponentStateContext();

  const handleOnExit = useCallback(async () => {
    await sleep(300);
    setPageNavigationDirection('page-forward');
    setTransitioning(false);
  }, []);

  const nodeRef = matchingRoute ? matchingRoute.nodeRef : null;

  return (
    <>
      <MobileToolbar />
      <Box id="navigation" className="layout page-forward">
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            nodeRef={nodeRef}
            timeout={300}
            unmountOnExit
            classNames="mobile-transition"
            onExited={handleOnExit}
          >
            <Box ref={nodeRef} className="mobile-transition">
              {currentOutlet}
            </Box>
          </CSSTransition>
        </TransitionGroup>
      </Box>
      {/* <Footer /> */}
    </>
  );
}

MobileLayout.propTypes = {
  routes: PropTypes.array,
};

function Footer() {
  const CurrentYear = new Date().getFullYear();
  const privacyPolicyUrl = `${marketingSiteUrl}privacy`;
  const termsOfUseUrl = `${marketingSiteUrl}terms`;
  return (
    <FooterContent>
      <Typography variant="body2">
        Copyright © 2013-{CurrentYear} ContractorTools LLC
      </Typography>
      <Stack direction="row" gap={1}>
        <FooterLink to={privacyPolicyUrl}>Privacy Policy</FooterLink>
        <Divider orientation="vertical" flexItem />
        <FooterLink to={termsOfUseUrl}>Terms of Use</FooterLink>
      </Stack>
    </FooterContent>
  );
}

// ##########################################
// ### Styled Components
// ##########################################

const FooterContent = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderTop: '1px solid',
  borderTopColor: theme.palette.divider,
  boxSize: 'border-box',
  display: 'flex',
  padding: theme.spacing(2),
  height: 82,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.primary,
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    zIndex: theme.zIndex.drawer + 2,
  },
}));

const FooterLink = styled((props) => (
  <Link {...props} target="_blank" rel="noopener noreferrer" />
))(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

// ##########################################
// ### Helper functions
// ##########################################

// function updateRibbonClass(drawer, currentRoute) {
//   if (currentRoute && currentRoute.animate) {
//     drawer?.classList.add('ribbon');
//   } else {
//     drawer?.classList.remove('ribbon');
//   }
// }

// function findRouteByPathname(pathname, routes) {
//   // const drawer = document.getElementById('drawer-ribbon');

//   const currentRoute = routes.find((route) => matchPath(route.path, pathname));
//   console.log('Pathanme:', pathname);
//   console.log('Current Route:', currentRoute);

//   // Making this side-effect here to reduce running find twice.
//   // once in updateRibbonClass and once in findRouteByPathname
//   // updateRibbonClass(drawer, currentRoute);

//   return currentRoute;
// }

function findRouteByPathname(pathname, routes, parentPath = null) {
  // Loop through all the routes
  for (let route of routes) {
    // Create a pattern that needs to match to the end.
    // Tack on the parent path if it exists.
    const pattern = {
      path: parentPath ? `${parentPath}/${route.path}` : route.path,
      end: true,
    };

    // If the pattern matches the pathname, return the route.
    if (matchPath(pattern, pathname)) {
      return route;
    }

    // If the route has children, recursively call this function
    if (route.children) {
      const childRoute = findRouteByPathname(
        pathname,
        route.children,
        route.path
      );
      if (childRoute) {
        return childRoute;
      }
    }
  }

  return null;
}
