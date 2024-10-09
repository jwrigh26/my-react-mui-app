import { createSlice } from '@reduxjs/toolkit';
// import userSession from 'lib/storage/user';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    invalidToken: true,
    token: undefined,
  },
  reducers: {
    invalidateToken(state) {
      state.invalidToken = true;
      state.token = undefined;
    },

    setUser(state, action) {
      const { payload } = action;

      if (!payload.token || !payload.exp) {
        console.error(
          'No token or exp provided in payload. invalidToken!',
          payload
        );
      }

      return {
        ...state,
        ...payload,
        // invalidToken: userSession.tokenHasExpired(payload.token),
      };
    },
  },
});

export const { invalidateToken, setUser } = userSlice.actions;

// Not doing any modification to the user so we can just return it
export const selectUser = (state) => state.user;

// export const selectUser = createSelector(
//   (state) => state.user, // extract user from state
//   (user) => user // derive user from state to memoize
// );

export default userSlice.reducer;
