import { configureStore } from '@reduxjs/toolkit';

import mySliceReducer from './Slice';
import { User } from '../api/User.api';
import { Assistants } from '../api/Assistants.api';
import { ChatApi } from '../api/Chats.api';

const store = configureStore({
  reducer: {
    slice: mySliceReducer,
    [User.reducerPath]: User.reducer,
    [Assistants.reducerPath]: Assistants.reducer,
    [ChatApi.reducerPath]: ChatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(User.middleware)
      .concat(Assistants.middleware)
      .concat(ChatApi.middleware),
});

export default store;
