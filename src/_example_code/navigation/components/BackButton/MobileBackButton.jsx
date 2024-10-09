import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Button from 'components/Buttons/Button';
import Icon from 'components/Icon';

export default function BackButton({ label, onClick: handleOnClick }) {
  return (
    <Button
      variant="text"
      onClick={handleOnClick}
      startIcon={<Icon icon={faChevronLeft} />}
      sx={{ textTransform: 'capitalize' }}
    >
      <span
        style={{
          textTransform: 'capitalize',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '14ch',
          textAlign: 'left',
        }}
      >
        {label}
      </span>
    </Button>
  );
}

BackButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};
