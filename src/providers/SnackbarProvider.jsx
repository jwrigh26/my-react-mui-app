/* eslint-disable no-nested-ternary */
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import MuiAlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import MuiSnackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { hasValue, isEmpty, isFunction, isNil } from 'utils/helpers';

const SnackbarContext = createContext();

export function useSetSnackbarContext() {
  return useContext(SnackbarContext);
}

const PrivateSnackbarContext = createContext();

export function usePrivateSnackbarContext() {
  return useContext(PrivateSnackbarContext);
}

const initialState = {
  snackbars: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SNACKBAR':
      if (
        state.snackbars.find((snackbar) => snackbar.id === action.payload.id)
      ) {
        return state; // returns the existing state if snackbar is already present
      }
      return {
        ...state,
        snackbars: [...state.snackbars, action.payload],
      };
    case 'REMOVE_SNACKBAR': {
      const filtered = state.snackbars.filter(
        (s) => s.id !== action.payload.id
      );
      if (filtered.length === state.snackbars.length) {
        return state; // returns the existing state if no snackbar is removed
      }
      return {
        ...state,
        snackbars: filtered,
      };
    }
    default:
      return state;
  }
}

// ##############################
// ### Provider
// ##############################

export default function SnackbarProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSnackbar = useCallback((snackbar) => {
    if (!hasValue(snackbar?.id)) {
      console.error('Snackbar must have an id');
      return;
    }

    return dispatch({ type: 'SET_SNACKBAR', payload: snackbar });
  }, []);

  const removeSnackbar = useCallback(
    (id) => () => {
      const currentSnackbar = state.snackbars.find((s) => s.id === id);
      if (isFunction(currentSnackbar?.remove)) {
        currentSnackbar.remove();
      }

      dispatch({ type: 'REMOVE_SNACKBAR', payload: { id } });
    },
    [state]
  );

  const privateValue = useMemo(
    () => ({
      removeSnackbar,
      currentSnackbar: getCurrentSnackbar(state.snackbars),
    }),
    [state]
  );

  return (
    <SnackbarContext.Provider value={setSnackbar}>
      <PrivateSnackbarContext.Provider value={privateValue}>
        {children}
        <Snackbar />
      </PrivateSnackbarContext.Provider>
    </SnackbarContext.Provider>
  );
}

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// ##############################
// ### Snackbar
// ##############################

function getCurrentSnackbar(snackbars) {
  if (isNil(snackbars) || isEmpty(snackbars)) {
    return null;
  }

  const queue = [...snackbars];
  const snackbar = queue.shift();
  return snackbar;
}

function Snackbar() {
  const { currentSnackbar, removeSnackbar } = usePrivateSnackbarContext();

  if (!hasValue(currentSnackbar)) {
    return null;
  }

  const {
    anchor: customerAnchor,
    duration,
    id,
    message,
    severity,
    sx,
    title,
  } = currentSnackbar ?? {};

  const anchor = customerAnchor ?? { vertical: 'top', horizontal: 'left' };

  const hideDuration = duration ?? 6000;

  return (
    <MuiSnackbar
      anchorOrigin={anchor}
      autoHideDuration={hideDuration}
      disableWindowBlurListener
      key={id}
      onClose={removeSnackbar(currentSnackbar?.id)}
      open
      sx={{
        minWidth: { sm: '480px', md: '512px' },
        ...sx,
      }}
    >
      <MuiAlert
        elevation={6}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={removeSnackbar(currentSnackbar?.id)}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        {title && (
          <MuiAlertTitle
            sx={{
              fontWeight: 'fontWeightBold',
              mt: {
                xs: '-3px', // Default to -3px for xs and up
                sm: '-3px', // Explicitly defining for clarity, could be omitted
                md: '-3px', // Explicitly defining for clarity, could be omitted
                lg: '-5px', // Overrides to -5px for lg and bigger
              },
            }}
          >
            {title}
          </MuiAlertTitle>
        )}
        <Typography>{message}</Typography>
      </MuiAlert>
    </MuiSnackbar>
  );
}
