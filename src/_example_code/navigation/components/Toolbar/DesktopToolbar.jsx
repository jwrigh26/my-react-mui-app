import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import contractorToolsLogo from 'assets/images/contractor-tools-logo.png';
import sosLogo from 'assets/images/logo-build-sos.jpg';
import Icon from 'components/Icon';
import { marketingSiteUrl } from 'data/constants';
import { CompanyDropdown } from 'features/company';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { options } from './options';

export default function DesktopToolbar({ isPublic = false, sos = false }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleNavigateToMarketing = useCallback(() => {
    const link = document.createElement('a');
    link.href = marketingSiteUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  }, []);

  const handleOnClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <StyledAppBar>
        <StyledToolbar>
          {sos && <SOSLogo />}
          <HeaderLogo onClick={handleNavigateToMarketing}>
            <img src={contractorToolsLogo} alt="Contractor Tools Logo" />
          </HeaderLogo>
          {!isPublic && <StyledDivider orientation="vertical" flexItem />}
          {!isPublic && <CompanyDropdown />}
          <TrailingContent>
            <OptionsButton onClick={handleOnClick} />
          </TrailingContent>
        </StyledToolbar>
      </StyledAppBar>
      {/* MENUS START HERE */}

      <OptionsMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((item) => (
          <MenuItem key={item.url} onClick={handleClose}>
            <MenuLink href={item.url} target="_blank" rel="noopener noreferrer">
              <Icon icon={item.icon} />
              {item.label}
            </MenuLink>
          </MenuItem>
        ))}
      </OptionsMenu>
    </>
  );
}

DesktopToolbar.propTypes = {
  isPublic: PropTypes.bool,
  sos: PropTypes.bool,
};

// ##############################
// ### Styles
// ##############################

const StyledAppBar = styled((props) => (
  <AppBar elevation={1} position="fixed" {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  [theme.breakpoints.up('sm')]: {
    zIndex: theme.zIndex.drawer + 2,
  },
}));

const StyledToolbar = styled((props) => <Toolbar disableGutters {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    color: theme.palette.getColor('charcoal'),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    gap: theme.spacing(1),
  })
);

const StyledDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const OptionsButton = styled((props) => (
  <IconButton edge="end" {...props}>
    <Icon size="xs" icon={faEllipsisV} />
  </IconButton>
))(({ theme }) => ({
  width: '40px',
  height: '40px',
  color: theme.palette.charcoal.main,
}));

const OptionsMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.blue.veryLight,
    borderRadius: 4,
    marginTop: theme.spacing(1),
    minWidth: 180,
    overflow: 'visible',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: -8,
      right: 10,
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderBottom: `8px solid ${theme.palette.blue.veryLight}`,
    },
  },
}));

const HeaderLogo = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'publicView',
})(({ theme, publicView }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: publicView ? '180px' : '200px',
  paddingRight: theme.spacing(1),

  [theme.breakpoints.up('lg')]: {
    maxWidth: '224px',
  },

  '& img': {
    width: '100%',
    height: 'auto',
  },
}));

const SOSLogo = styled((props) => (
  <Link to="/">
    <img src={sosLogo} alt="SoS Logo" {...props} />
  </Link>
))(() => ({
  width: 48,
  height: 'auto',
}));

const TrailingContent = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexGrow: 1,
}));

const MenuLink = styled('a')(({ theme }) => ({
  ...theme.typography.body1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
  color: 'inherit',
  textDecoration: 'none',
  width: '100%',
  '&:hover': {
    color: 'inherit',
  },
}));
