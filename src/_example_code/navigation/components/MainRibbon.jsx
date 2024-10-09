import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SignoutModal, useSignout } from 'features/login';
import {
  AdminRibbon,
  NavigationCell,
  NavigationRibbon,
  homeNavigation,
} from 'features/navigation';
import {
  useNavigateNoTransition,
  useNavigateTransition,
} from 'hooks/useTransition';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom'; // Step 1

export default function MainRibbon() {
  const { handleOpen: handleOpenSignoutModal } = useSignout();
  const noAnimateNavigate = useNavigateNoTransition();
  const animateNavigate = useNavigateTransition();
  const location = useLocation(); // Step 2
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigate = useCallback(
    (navItem) => () => {
      // Adjust the condition for animation
      // If it's mobile, always animate. If it's not mobile, animate only if navItem.animate is true.
      const animate = isMobile || !!navItem?.animate;
      if (navItem.text === 'Sign Out') {
        handleOpenSignoutModal();
      } else {
        const navigateFunction = animate ? animateNavigate : noAnimateNavigate;
        navigateFunction(navItem.to)();
      }
    },
    [handleOpenSignoutModal, animateNavigate, noAnimateNavigate, isMobile] // Added isMobile to the dependency array
  );

  // Function to determine if the navItem is active
  const isActive = useCallback(
    (navItem) => {
      return navItem.to && location.pathname === navItem.to;
    },
    [location.pathname]
  );

  // Setup for admin: Todo add permission check
  const isAdmin = true;

  return (
    <>
      <NavigationRibbon admin={isAdmin} classNames="">
        {homeNavigation.map((navItem) => (
          <NavigationCell
            {...navItem}
            isActive={isActive(navItem)}
            disableActiveStyles={navItem.text === 'Sign Out'}
            key={navItem.text}
            onClick={handleNavigate(navItem)}
          />
        ))}
        {isAdmin && <AdminRibbon onNavigate={handleNavigate} />}
      </NavigationRibbon>
      <SignoutModal mobile={isMobile} />
    </>
  );
}
