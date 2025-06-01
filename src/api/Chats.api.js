import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ChatApi = createApi({
  reducerPath: 'chatApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://imagegpt.operator.kg/api/v1/',

    prepareHeaders: (headers) => {
      const userData =
        JSON.parse(localStorage.getItem('bakaiGPT_sha265')) || {};

      if (userData.id) {
        headers.set('user-external-id', userData.id);
        headers.set('hash', userData.hash);
      }

      return headers;
    },
  }),

  tagTypes: ['Chats', 'ChatsId'], // добавляем `tagTypes` для автоматического обновления state

  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => ({
        url: 'chats/',
        method: 'GET',
      }),
      providesTags: ['Chats'], // автоматическое обновление после изменений
    }),

    // Получение конкретного чата по ID
    getChatById: builder.query({
      query: (chatId) => ({
        url: `chats/${chatId}/`,
        method: 'GET',
      }),
      providesTags: ['ChatsId'], // обновляем кэш после запроса
    }),

    // Создание нового чата
    postChat: builder.mutation({
      query: ({ id }) => ({
        url: `chats/?assistant_id=${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Chats'], // запрос обновит список чатов
    }),

    // Удаление чата по ID
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `chats/${chatId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Chats'], // чаты обновятся после удаления
    }),

    uploadFile: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: 'chats/upload/',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetChatsQuery,
  useLazyGetChatsQuery,
  useLazyGetChatByIdQuery,
  usePostChatMutation,
  useDeleteChatMutation,
  useUploadFileMutation,
} = ChatApi;
