import { createSlice } from '@reduxjs/toolkit';
import { INotification } from '../containers/Notification';

export interface INotificationSlice {
  notifications: INotification[];
}

const initialState: INotificationSlice = {
  notifications: [],
};

const notificationSlice = createSlice({
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
  },
});

const { actions, reducer } = notificationSlice;

export default reducer;
export const { setNotification, deleteNotification } = actions;
