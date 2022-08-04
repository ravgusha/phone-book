import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  currentContact: number | null;
}

const initialState: IState = {
  currentContact: null,
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setCurrentContact: (state, action) => {
      state.currentContact = action.payload;
    },
  },
});

const { actions, reducer } = slice;

export default reducer;
export const { setCurrentContact } = actions;
