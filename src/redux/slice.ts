import { createSlice } from '@reduxjs/toolkit';
import { INotification } from '../containers/Notification';

export interface ISlice {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notifications: INotification[] | any[];
  name: string;
  isLoggedIn: boolean;
  token: string;
}

const initialState: ISlice = {
  notifications: [],
  name: '',
  isLoggedIn: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token') || '',
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notifications.push({
        message: action.payload.message,
        type: action.payload.type,
        id: action.payload.id,
      });
    },
    deleteNotification: (state, action) => {
      const index = state.notifications.findIndex(
        (notification) => notification.id === action.payload
      );
      if (index !== -1) {
        state.notifications.splice(index, 1);
      }
    },
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

const { actions, reducer } = slice;

export default reducer;
export const { setNotification, deleteNotification, setUserInformation, deleteUserInformation } =
  actions;
