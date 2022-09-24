import { createSlice } from '@reduxjs/toolkit';
import { INotification } from '../containers/Notification';

export interface ISlice {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notifications: INotification[] | any[];
  name: string;
  isLoggedIn: boolean;
}

const initialState: ISlice = {
  notifications: [],
  name: '',
  isLoggedIn: false,
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
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
  },
});

const { actions, reducer } = slice;

export default reducer;
export const { setNotification, deleteNotification, setUserInformation } = actions;
