import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationContainer } from './style';
import { deleteNotification, ISlice } from '../../redux/slice';

type NotificationType = 'success' | 'error' | 'warning';

export interface INotification {
  id: string;
  message: string;
  type: NotificationType;
}

export interface IState {
  slice: ISlice;
}

const Notification = () => {
  const notifications = useSelector((state: IState) => state.slice.notifications);
  const dispatch = useDispatch();

  const onClose = (id: string) => {
    dispatch(deleteNotification(id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (notifications.length) {
        dispatch(deleteNotification(notifications[0].id));
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [notifications]);

  return (
    <NotificationContainer>
      {notifications.map((notification: INotification) => (
        <div key={notification.id} className={notification.type}>
          <button onClick={() => onClose(notification.id)}>X</button>
          <p>{notification.message}</p>
        </div>
      ))}
    </NotificationContainer>
  );
};

export default Notification;
