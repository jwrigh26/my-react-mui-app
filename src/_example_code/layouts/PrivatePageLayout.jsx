import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

export default function PageLayout({ children }) {
  return <Layout>{children}</Layout>;
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

// ##########################################
// ### Child Components
// ##########################################

const Layout = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2, 3),
  },
  backgroundColor: theme.palette.grey.light,
}));
