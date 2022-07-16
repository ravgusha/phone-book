import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
  },
});

const { actions, reducer } = slice;

export default reducer;
export const { setContacts } = actions;
