import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useHeaderLabel } from 'features/navigation';
import PropTypes from 'prop-types';

export default function MobileRibbonLayout({ children }) {
  const headerLabel = useHeaderLabel({ mobile: true });

  return (
    <>
      <Toolbar />
      <NavigationHeader>
        <Header>{headerLabel}</Header>
      </NavigationHeader>
      <Divider flexItem />
      {children}
    </>
  );
}

MobileRibbonLayout.propTypes = {
  children: PropTypes.any,
};

// ##########################################
// ### Styled Components
// ##########################################

export const NavigationHeader = styled((props) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="flex-start"
    spacing={1}
    {...props}
  />
))(({ theme }) => ({
  height: 32,
  maxHeight: 32,
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(2),
}));

export const Header = styled((props) => (
  <Typography variant="subtitle2" {...props} />
))(({ theme }) => ({
  overflow: 'hidden',
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightBold,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '24ch',
}));
