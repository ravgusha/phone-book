import { createSlice } from '@reduxjs/toolkit';
import { IPerson } from '../types';

export interface IState {
  contacts: Array<IPerson>;
  currentContact: number | null;
}

const initialState: IState = {
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
