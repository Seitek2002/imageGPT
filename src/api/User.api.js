import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const User = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://imagegpt.operator.kg/api/v1/',
  }),
  endpoints: (builder) => ({
    postUsers: builder.mutation({
      query: ({ id }) => {
        return {
          url: 'users/',
          method: 'POST',
          body: {
            user_external_id: id,
          },
        };
      },
    }),
  }),
});

export const { usePostUsersMutation } = User;
