import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  list: [
    { id: 'id-1', name: 'Harper Rodriguez', tel: '459-12-56' },
    { id: 'id-2', name: 'Mia Chen', tel: '443-89-12' },
    { id: 'id-3', name: 'Donovan Patel', tel: '645-17-79' },
    { id: 'id-4', name: 'Isabella Santiago', tel: '227-91-26' },
  ],
};

export const contactsSlice = createSlice({
  name: 'contacts',

  initialState,

  reducers: {
    createContact: {
      reducer: (state, { payload }) => ({ list: [...state.list, payload] }),
      prepare: contact => ({ payload: { id: nanoid(), ...contact } }),
    },

    removeContact: (state, { payload }) => ({
      list: state.list.filter(({ id }) => id !== payload),
    }),
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsPersistedReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { createContact, removeContact } = contactsSlice.actions;
