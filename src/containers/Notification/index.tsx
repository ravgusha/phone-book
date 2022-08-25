import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Notification = () => {
  const notifications  = useSelector((state) => state.notifications);
  console.log(notifications.type);
  return <h2>ex</h2>;
};

export default Notification;
