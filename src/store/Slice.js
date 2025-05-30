import { createSlice } from '@reduxjs/toolkit';
import { Assistants } from '../api/Assistants.api';

const initialState = {
  burgerMenuOpen: true,
  activeAssistant: {
    description: 'Поможет с продвижением бизнеса',
    id: 1,
    name: 'Маркетолог',
    photo: 'https://i.ibb.co/d4cJLSDv/image-2025-02-08-00-32-53.png',
  },
  assistants: [],
  chatId: 0,
  chats: [],
  chooseAssistant: false,
};

const slice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    toggleBurgerMenu: (state) => {
      state.burgerMenuOpen = !state.burgerMenuOpen;
    },
    setActiveAssistant: (state, action) => {
      state.activeAssistant = action.payload;
    },
    setChat: (state, action) => {
      state.chatId = action.payload;
    },
    setChooseAssistant: (state, action) => {
      state.chooseAssistant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      Assistants.endpoints.getAssistants.matchFulfilled,
      (state, { payload }) => {
        state.assistants = payload;
        state.activeAssistant = payload[0];
      }
    );
  },
});

export const {
  toggleBurgerMenu,
  handleModeChange,
  setActiveAssistant,
  setChat,
  setChooseAssistant,
} = slice.actions;

export default slice.reducer;
