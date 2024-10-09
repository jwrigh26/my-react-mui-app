import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';

export default function ImpersonateChip() {
  const impersonating = useSelector(
    (state) => state.root.impersonate.impersonating
  );

  if (!impersonating) {
    return null;
  }

  return (
    <Chip
      label="Impersonating"
      color="warning"
      variant="outlined"
      sx={{ mr: 2 }}
      size="small"
      clickable={false}
    />
  );
}

// TODO: Fix Signout mobile css
// Finish adming impersonation
