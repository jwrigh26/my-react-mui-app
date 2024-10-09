import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

export default function NavigationRibbon({ children, admin: isAdmin }) {
  return (
    <Ribbon admin={isAdmin} dense>
      {children}
    </Ribbon>
  );
}

NavigationRibbon.propTypes = {
  children: PropTypes.node,
  admin: PropTypes.bool,
};

// ###########################
// ### Styled Components
// ###########################

export const Ribbon = styled(List, {
  shouldForwardProp: (prop) => prop !== 'admin',
})(({ theme, admin }) => ({
  width: '100%',
  '& button:last-child': {
    borderBottom: admin ? 'unset' : 'none',
    // boxShadow: admin ? theme.shadows[1] : 'none', // Add shadow if admin
  },

  paddingBottom: admin ? 0 : theme.spacing(1),
  marginBottom: admin ? 0 : 98,
  [theme.breakpoints.up('md')]: {
    marginBottom: admin ? 0 : 56,
  },
}));
