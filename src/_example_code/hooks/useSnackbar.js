import { useCallback } from 'react';
import { useSetSnackbarContext } from '../providers/SnackbarProvider';

const defaultAnchor = { vertical: 'top', horizontal: 'left' };
const defaultDuration = 5000;

export function useInfoSnackbar({
  anchor = defaultAnchor,
  duration = defaultDuration,
} = {}) {
  const setSnackbar = useSetSnackbarContext();

  const handleSetSnackbar = useCallback(
    (message, options = {}) => {
      const payload = {
        anchor,
        message,
        title: 'Info',
        severity: 'info',
        id: `info-${message}-${Date.now()}`,
        duration,
        ...options,
      };
      setSnackbar(payload);
    },
    [setSnackbar]
  );

  return handleSetSnackbar;
}

export function useSuccessSnackbar({
  anchor = defaultAnchor,
  duration = defaultDuration,
} = {}) {
  const setSnackbar = useSetSnackbarContext();

  const handleSetSnackbar = useCallback(
    (message, options = {}) => {
      const payload = {
        anchor,
        message,
        title: 'Success',
        severity: 'success',
        id: `success-${message}-${Date.now()}`,
        duration,
        ...options,
      };
      setSnackbar(payload);
    },
    [setSnackbar]
  );

  return handleSetSnackbar;
}

export function useErrorSnackbar({
  anchor = defaultAnchor,
  duration = defaultDuration,
} = {}) {
  const setSnackbar = useSetSnackbarContext();

  const handleSetSnackbar = useCallback(
    (message, options = {}) => {
      const payload = {
        anchor,
        message,
        title: 'Error',
        severity: 'error',
        id: `error-${message}-${Date.now()}`,
        duration,
        ...options,
      };
      setSnackbar(payload);
    },
    [setSnackbar]
  );

  return handleSetSnackbar;
}

export function useWarningSnackbar({
  anchor = defaultAnchor,
  duration = defaultDuration,
} = {}) {
  const setSnackbar = useSetSnackbarContext();

  const handleSetSnackbar = useCallback(
    (message, options = {}) => {
      const payload = {
        anchor,
        message,
        title: 'Warning',
        severity: 'warning',
        id: `warning-${message}-${Date.now()}`,
        duration,
        ...options,
      };
      setSnackbar(payload);
    },
    [setSnackbar]
  );

  return handleSetSnackbar;
}
