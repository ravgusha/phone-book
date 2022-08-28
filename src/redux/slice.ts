import { createSlice } from '@reduxjs/toolkit';
import { INotification } from '../containers/Notification';

export interface ISlice {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notifications: INotification[] | any[];
}

const initialState: ISlice = {
  notifications: [],
};

const slice = createSlice({
  name: 'notifications',
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
  },
});

const { actions, reducer } = slice;

export default reducer;
export const { setNotification, deleteNotification } = actions;
