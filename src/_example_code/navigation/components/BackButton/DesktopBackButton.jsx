import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Button from 'components/Buttons/Button';
import Icon from 'components/Icon';

export default function BackButton({ children, onClick: handleOnClick, }) {
  return (
    <>
      <Button
        variant="text"
        onClick={handleOnClick}
        startIcon={<Icon icon={faChevronLeft} />}
        sx={{ minWidth: 0, pl: 0, pb: 0, pt: 0, maxWidth: 'auto'}}
        edge="start"
      >
        <span
          style={{
            textTransform: 'capitalize',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '28ch',
            textAlign: 'left',
          }}
        >
        { children }
        </span>
      </Button>
    </>
  );
}

BackButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func
};
