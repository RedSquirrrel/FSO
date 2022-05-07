import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  if (!notification) return null;

  return (
    <div>
      <p className={notification.type}>{notification.text}</p>
    </div>
  );
};

export default Notification;
