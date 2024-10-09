import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';

export default function ItemElement({ children }) {
  return (
    <Column>{children}</Column>
  );
}

ItemElement.propTypes = {
  children: PropTypes.node,
};

const Column = styled((props) => (
  <Stack direction="column" gap={0} {...props} />
))({
  flex: 1,
  alignItems: 'flex-start',
  justifyContent: 'center',
});