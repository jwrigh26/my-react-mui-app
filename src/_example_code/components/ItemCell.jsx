import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Icon from 'components/Icon';
import TransitionLink from 'components/TransitionLink';
import PropTypes from 'prop-types';

export default function ItemCell({
  active,
  altText,
  icon,
  id,
  element,
  onClick: handleClick,
}) {
  return (
    <TransitionLink id={id} isActive={active} onClick={handleClick}>
      <CellGrid>
        <CellIcon src={icon} alt={altText} />
        <CellElement>{element}</CellElement>
      </CellGrid>
      <CellChevron />
    </TransitionLink>
  );
}

ItemCell.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string,
  id: PropTypes.string,
  altText: PropTypes.string,
  element: PropTypes.element,
  onClick: PropTypes.func,
};

// ###########################
// ### Styled Components
// ###########################
const CellGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '20px auto',
  gridTemplateRows: 'auto',
  gridTemplateAreas: `
    "icon element"
  `,
  gap: theme.spacing(1),
  alignItems: 'flex-start',
  flex: 1,
  width: '100%',
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

const CellElement = styled(Box)({
  gridArea: 'element',
  // backgroundColor: 'pink',
});

const CellChevron = styled((props) => (
  <Icon icon={faChevronRight} size="1x" {...props} />
))(({ theme }) => ({
  marginLeft: 'auto',
  color: theme.palette.grey[300],
}));
