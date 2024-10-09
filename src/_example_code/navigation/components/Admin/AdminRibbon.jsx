import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import ImpersonateCell from './ImpersonateCell';

const adminNavigation = [
  {
    altText: 'impersonate',
    src: '/icons/services_128x128.png',
    text: 'Impersonate',
    to: '/admin/impersonate',
    animate: false,
  },
];

export default function AdminRibbon({ onNavigate }) {
  const isActive = useCallback(
    (navItem) => {
      return navItem.to && location.pathname === navItem.to;
    },
    [location.pathname]
  );

  return (
    <>
      {/* <Divider flexItem /> */}
      <Stack gap={0}>
        <Typography sx={{ p: 2, pt: '28px', pb: 1 }} variant="subtitle2">
          Admin
        </Typography>
        <Divider flexItem />
        {adminNavigation.map((navItem) => (
          <ImpersonateCell
            {...navItem}
            onClick={onNavigate(navItem)}
            isActive={isActive(navItem)}
            key={navItem.text}
          />
        ))}
      </Stack>
    </>
  );
}

AdminRibbon.propTypes = {
  onNavigate: PropTypes.func,
};
