import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useReducer } from 'react';

const ComponentContext = createContext();

export function useComponentStateContext() {
  return useContext(ComponentContext);
}

const initialState = {
  open: {}, // key value pair of modal ids and their open state
  loading: {},
  disabled: {},
  focused: {},
  transitioning: false,
  zIndex: 1003,
  temp: {}, // new key for temp state
  bag: {}, // new key for bag state
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLOSE_ALL':
      return {
        ...state,
        open: {},
        loading: {},
        disabled: {},
      };
    case 'CLOSE_COMPONENT':
      return {
        ...state,
        open: {
          ...state.open,
          [action.payload]: false,
        },
        loading: {
          ...state.loading,
          [action.payload]: false,
        },
        disabled: {
          ...state.disabled,
          [action.payload]: false,
        },
      };
    case 'OPEN_COMPONENT':
      return {
        ...state,
        open: {
          ...state.open,
          [action.payload]: true,
        },
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.id]: action.payload.loading,
        },
      };
    case 'SET_DISABLED':
      return {
        ...state,
        disabled: {
          ...state.disabled,
          [action.payload.id]: action.payload.disabled,
        },
      };
    case 'SET_TRANSITIONING':
      return {
        ...state,
        transitioning: action.payload,
      };
    case 'SET_Z_INDEX':
      return {
        ...state,
        zIndex: action.payload,
      };
    case 'TOGGLE_OPEN':
      return {
        ...state,
        open: {
          ...state.open,
          [action.payload.id]: !state.open[action.payload.id],
        },
      };
    case 'SET_FOCUSED':
      return {
        ...state,
        focused: {
          ...state.focused,
          [action.payload.id]: action.payload.focused,
        },
      };
    case 'SET_TEMP':
      return {
        ...state,
        temp: {
          ...state.temp,
          [action.payload.id]: action.payload.temp,
        },
      };
    case 'SET_BAG':
      return {
        ...state,
        bag: {
          ...state.bag,
          [action.payload.id]: action.payload.bag,
        },
      };
    default:
      return state;
  }
};

export default function ComponentStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const closeAll = () => {
    dispatch({ type: 'CLOSE_ALL' });
  };

  const setClose = (id) => () => {
    dispatch({ type: 'CLOSE_COMPONENT', payload: id });
  };

  const setOpen = (id) => () => {
    dispatch({ type: 'OPEN_COMPONENT', payload: id });
  };

  const setLoading = (id) => (loading) => {
    dispatch({ type: 'SET_LOADING', payload: { id, loading } });
  };

  const setDisabled = (id) => (disabled) => {
    dispatch({ type: 'SET_DISABLED', payload: { id, disabled } });
  };

  const setTransitioning = (transitioning) => {
    dispatch({ type: 'SET_TRANSITIONING', payload: transitioning });
  };

  const setZIndex = (zIndex) => {
    dispatch({ type: 'SET_Z_INDEX', payload: zIndex });
  };

  const toggleOpen = (id) => () => {
    dispatch({ type: 'TOGGLE_OPEN', payload: { id } });
  };

  const setFocused = (id) => (focused) => {
    dispatch({ type: 'SET_FOCUSED', payload: { id, focused } });
  };

  const setTemp = (id) => (temp) => {
    dispatch({ type: 'SET_TEMP', payload: { id, temp } });
  };

  const setBag = (id) => (bag) => {
    dispatch({ type: 'SET_BAG', payload: { id, bag } });
  };

  const value = useMemo(
    () => ({
      state,
      closeAll,
      setClose,
      setOpen,
      setLoading,
      setDisabled,
      setTransitioning,
      setZIndex,
      setFocused,
      toggleOpen,
      setTemp,
      setBag,
    }),
    [state]
  );

  return (
    <ComponentContext.Provider value={value}>
      {children}
    </ComponentContext.Provider>
  );
}

ComponentStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
