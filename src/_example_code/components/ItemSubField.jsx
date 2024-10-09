import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ItemSubField({ text }) {
  return (
    <Row>
      <SubText>
        {text}
      </SubText>
    </Row>
  );
}

ItemSubField.propTypes = {
  text: PropTypes.string,
};

const Row = styled((props) => <Stack direction="row" gap={1} {...props} />)({
  flex: 1,
  alignItems: 'baseline',
  justifyContent: 'space-between',
  width: '100%',
});

const SubText = styled((props) => (
  <Typography variant="caption" {...props} />
))(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
