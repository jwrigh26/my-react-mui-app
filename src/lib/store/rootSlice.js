import { createSlice } from '@reduxjs/toolkit';
// import { createSelector } from 'reselect';

const defaultValues = {
  impersonate: {
    admin: null,
    impersonating: null,
  },
  bootstrapped: false,
};

const rootSlice = createSlice({
  name: 'root',
  initialState: defaultValues,
  reducers: {
    reset() {
      return defaultValues;
    },
    setBootstrapped(state, action) {
      state.bootstrapped = action.payload;
    },
  },
});

export const { reset, setBootstrapped } = rootSlice.actions;

export const selectBootstrapped = (state) => state.root.bootstrapped;

export default rootSlice.reducer;
