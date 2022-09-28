import { createSlice } from '@reduxjs/toolkit';

export interface IUserSlice {
  name: string;
  isLoggedIn: boolean;
  token: string;
}

const initialState: IUserSlice = {
  name: '',
  isLoggedIn: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInformation: (state, action) => {
      state.name = action.payload.user.name;
      state.isLoggedIn = true;
      state.token = action.payload.accessToken;
    },
    deleteUserInformation: (state) => {
      state.name = '';
      state.isLoggedIn = false;
      state.token = '';
    },
  },
});

const { actions, reducer } = userSlice;

export default reducer;
export const { setUserInformation, deleteUserInformation } = actions;
