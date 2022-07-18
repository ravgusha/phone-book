import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  currentContact: null
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setCurrentContact: (state, action) => {
      state.currentContact = action.payload;
    },
  },
});

const { actions, reducer } = slice;

export default reducer;
export const { setContacts, setCurrentContact } = actions;
