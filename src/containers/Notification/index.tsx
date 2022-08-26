import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Notification = () => {
  const notifications = useSelector((state) => state.slice.notifications);
  if (notifications.length === 0) return null;
  else return toast.success(notifications[0].message);
};

export default Notification;
