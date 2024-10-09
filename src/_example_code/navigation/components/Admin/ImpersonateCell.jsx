import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Icon from 'components/Icon';
import TransitionLink from 'components/TransitionLink';
import PropTypes from 'prop-types';
import ImpersonateChip from './ImpersonateChip';

export default function ImpersonateCell({ src, alt, text, ...props }) {
  return (
    <TransitionLink {...props}>
      <NavIcon src={src} alt={alt} />
      <NavItemText>{text}</NavItemText>
      <ImpersonateChip />
      <NavChevron />
    </TransitionLink>
  );
}

ImpersonateCell.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  to: PropTypes.string,
};

// ###########################
// ### Styled Components
// ###########################

export const NavIcon = styled('img')(({ theme }) => ({
  height: '20px',
  width: '20px',
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('mobile')]: {
    height: '20px',
    width: '20px',
  },
}));

export const NavItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiTypography-root': {
    ...theme.typography.body2,
  },
  '& .MuiTypography-root:hover': {
    color: theme.palette.text.primary,
  },
}));

export const NavChevron = styled((props) => (
  <Icon icon={faChevronRight} size="1x" {...props} />
))(({ theme }) => ({
  color: theme.palette.grey[300],
  marginLeft: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '14px',
    height: '14px',
  },
}));
