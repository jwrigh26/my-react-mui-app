import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ItemField({ prefix, primary, secondary }) {
  return (
    <Row>
      <PrimaryText>
        {prefix && <span className="prefix">{prefix}</span>}
        <span className="label">{primary}</span>
      </PrimaryText>
      {secondary && <SecondaryText>{secondary}</SecondaryText>}
    </Row>
  );
}

ItemField.propTypes = {
  prefix: PropTypes.string,
  primary: PropTypes.string,
  secondary: PropTypes.string,
};

const Row = styled((props) => <Stack direction="row" gap={1} {...props} />)({
  flex: 1,
  alignItems: 'baseline',
  justifyContent: 'space-between',
  width: '100%',
});

const PrimaryText = styled((props) => (
  <Typography variant="caption" {...props} />
))(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: theme.typography.fontWeightBold,
  '& .prefix': {
    marginRight: theme.spacing(0.5),
  },
}));

const SecondaryText = styled((props) => (
  <Typography variant="caption" {...props} />
))(({ theme }) => ({
  // fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.secondary,
  margin: '0 0 0 auto',
}));
