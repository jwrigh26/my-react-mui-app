import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    reducerPath: 'api',
    prepareHeaders: (headers, { getState }) => {
      // console.log(`%cPrepareHeaders baseQuery`, 'color: #7FFFD4');
      headers.set('Content-Type', `application/json`);

      // Get token from the state
      const { token, invalidToken } = getState().user;

      // If we have a token, set the authorization header
      if (token && !invalidToken) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
    keepUnusedDataFor: 60 * 60 * 1, // 1 hour(s)
  }),
  endpoints: () => ({}),
});
