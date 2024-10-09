import { api } from './api';

export const publicApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET Posts
    getPosts: builder.query({
      query: () => ({
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        method: 'GET',
      }),
      transformResponse: (response) => {
        return response;
      },
      providesTags: () => {
        return ['POSTS'];
      },
    }),

    // POST Create a Post
    createPost: builder.mutation({
      query: (post) => ({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'POST',
        body: post, // Assuming the post object contains the required fields
      }),
      invalidatesTags: () => {
        return ['POSTS'];
      },
    }),
    // Cache Buster
    bustCache: builder.mutation({
      queryFn: () => ({ data: null }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: () => {
        console.log('Invalidates Tags -> BustCache');
        return ['POSTS'];
      },
      onQueryStarted: async (_arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          console.log('Data:', data);
          // dispatch(setFoo({ foo: data.foo }));
        } catch (error) {
          console.error('Error:', error);
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated
export const { useGetPostsQuery, useCreatePostMutation, useBustCacheMutation } =
  publicApi;
