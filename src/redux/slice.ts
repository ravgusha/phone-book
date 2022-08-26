import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notifications: any;
}

const initialState: IState = {
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
      });
    },
  },
});

const { actions, reducer } = slice;

export default reducer;
export const { setNotification } = actions;
