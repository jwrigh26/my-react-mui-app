import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import helmetIcon from 'assets/images/contractor-tools-helmet-icon.png';
import sosLogo from 'assets/images/logo-build-sos.jpg';
import Button from 'components/Buttons/Button';
import MobileDrawer from 'components/Drawer/MobileDrawer';
import Icon from 'components/Icon';
import { COMPONENT_KEYS } from 'data/constants';
import { CompanyMobileDrawer } from 'features/company';
import { useBackButtonLabel, useBackClick } from 'features/navigation';
import PropTypes from 'prop-types';
import { useComponentStateContext } from 'providers/ComponentStateProvider';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../BackButton/MobileBackButton';
import { options } from './options';

export default function MobileToolbar({ isPublic = false, sos = false }) {
  const { pathname } = useLocation();
  const backButtonLabel = useBackButtonLabel({ mobile: true });
  const handleOnClick = useBackClick({ mobile: true });
  const shouldHideButton = pathname === '/home' || pathname === '/';

  return (
    <>
      <StyledAppBar>
        <StyledToolbar>
          {sos && <SOSLogo />}
          {!shouldHideButton && !isPublic && (
            <>
              <BackButton
                label={backButtonLabel}
                onClick={handleOnClick(pathname)}
              />
              <StyledDivider orientation="vertical" flexItem />
            </>
          )}
          {!isPublic && <CompanyMobileDrawer />}
          <Options />
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
}

MobileToolbar.propTypes = {
  isPublic: PropTypes.bool,
  sos: PropTypes.bool,
};

// ##############################
// ### Options
// ##############################

function Options() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const modalContext = useComponentStateContext();

  const toggleDrawer = useCallback(
    (event) => {
      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }

      setOpen((prev) => !prev);
      modalContext.setDisabled(COMPONENT_KEYS.COMPANY_DRAWER)(!open);
    },
    [open]
  );

  const closeDrawer = useCallback(() => {
    setOpen(false);
    modalContext.setDisabled(COMPONENT_KEYS.COMPANY_DRAWER)(false);
  }, []);

  const handleOnOptionClick = useCallback(
    (url) => () => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setOpen(false);
      modalContext.setDisabled(COMPONENT_KEYS.COMPANY_DRAWER)(false);
    },
    []
  );

  return (
    <>
      <HelmetButton
        disabled={modalContext.state.disabled[COMPONENT_KEYS.OPTIONS_DRAWER]}
        open={open}
        onClick={toggleDrawer}
      >
        <img src={helmetIcon} alt="Contractor Tools Helmet Icon" />
        <Icon icon={faChevronDown} />
      </HelmetButton>
      <MobileDrawer
        open={open}
        onClose={closeDrawer}
        zIndex={theme.zIndex.appBar - 1}
      >
        <GridBox>
          <Toolbar />
          <List>
            {options.map((item) => (
              <ListItem disablePadding key={item.url}>
                <ListItemButton onClick={handleOnOptionClick(item.url)}>
                  <ListItemIcon>
                    <Icon icon={item.icon} />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Footer onClose={closeDrawer} />
        </GridBox>
      </MobileDrawer>
    </>
  );
}

function Footer({ onClose: handleClose }) {
  return (
    <>
      <Divider />
      <Box sx={{ width: '100%', padding: 2 }}>
        <Button
          fullWidth
          secondary
          startIcon={<Icon icon={faTimes} />}
          onClick={handleClose}
        >
          Close
        </Button>
      </Box>
    </>
  );
}

Footer.propTypes = {
  onClose: PropTypes.func,
};

// ##############################
// ### Styles
// ##############################

const GridBox = styled(Box)`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
`;

const StyledAppBar = styled((props) => (
  <AppBar elevation={1} position="fixed" {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const StyledToolbar = styled((props) => <Toolbar disableGutters {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    color: theme.palette.getColor('charcoal'),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    gap: theme.spacing(1),
  })
);

const StyledDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

// ##############################
// ### Options Styles
// ##############################

const HelmetButton = styled(
  (props) => <ButtonBase component="button" {...props} />,
  {
    shouldForwardProp: (prop) => prop !== 'open',
  }
)(({ theme, open }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
  gap: theme.spacing(1),
  margin: '0 0 0 auto',
  paddingRight: theme.spacing(2),
  '& img ': {
    width: '30px',
  },

  '& svg': {
    transform: `translateY(-50%) rotate(${open ? '180deg' : '0'})`,
    transition: 'transform 0.3s ease-in-out',
    color: theme.palette.blue.main,
    bottom: '2px',
    position: 'relative',
  },

  '&:hover': {
    opacity: 0.8,
  },

  '&:disabled': {
    opacity: 0.5,
  },
}));

const SOSLogo = styled((props) => (
  <img src={sosLogo} alt="SoS Logo" {...props} />
))(() => ({
  width: 48,
  height: 'auto',
}));
