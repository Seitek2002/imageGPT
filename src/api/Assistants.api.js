import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const Assistants = createApi({
  reducerPath: 'assistants',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bakaigpt.operator.kg//api/v1/',
  }),
  tagTypes: ['Assistants'],
  endpoints: (builder) => ({
    getAssistants: builder.query({
      query: () => ({ url: 'assistants/' }),
      providesTags: ['Assistants'],
    }),
  }),
});

export const { useGetAssistantsQuery } = Assistants;
