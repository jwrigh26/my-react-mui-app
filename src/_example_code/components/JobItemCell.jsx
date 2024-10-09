import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Icon from 'components/Icon';
import PropTypes from 'prop-types';
import TransitionLink from 'components/TransitionLink';
import Typography from '@mui/material/Typography';

export default function JobItemCell({ item }) {
  return (
    <TransitionLink to={item.url}>
      <CellGrid>
        <CellIcon src={item.icon} alt={item.altText} />
        <NameText>{item.name || ''}</NameText>
        <PriceText>{item.price || ''}</PriceText>
      </CellGrid>
      <CellChevron />
    </TransitionLink>
  );
}

JobItemCell.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.string,
    icon: PropTypes.string,
    altText: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string, // formattedPrice
  }),
};

// ###########################
// ### Styled Components
// ###########################
const CellGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto auto',
  gridTemplateColumns: 'auto auto auto',
  gridTemplateAreas: `
    "icon name"
    "icon price"
  `,
  rowGap: 0,
  columnGap: theme.spacing(1),
  alignItems: 'flex-start',
}));

export const CellIcon = styled('img')(({ theme }) => ({
  gridArea: 'icon',
  height: '20px',
  width: '20px',
  top: 4,
  marginRight: theme.spacing(1),
  position: 'relative',
  [theme.breakpoints.down('mobile')]: {
    height: '20px',
    width: '20px',
  },
}));

export const PrimaryText = styled((props) => (
  <Typography variant="body2" {...props} />
))(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const NameText = styled(PrimaryText)(({ theme }) => ({
  gridArea: 'name',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '32ch',
  [theme.breakpoints.up('mobile')]: {
    width: '24ch',
  },
  [theme.breakpoints.up('sm')]: {
    width: '18ch',
  },
}));

export const PriceText = styled((props) => (
  <Typography variant="subtitle2" {...props} />
))(({ theme }) => ({
  ...theme.typography.caption,
  gridArea: 'price',
  color: theme.palette.text.secondary,
}));

export const CellChevron = styled((props) => (
  <Icon icon={faChevronRight} size="1x" {...props} />
))(({ theme }) => ({
  color: theme.palette.grey[300],
  marginLeft: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '14px',
    height: '14px',
  },
}));
