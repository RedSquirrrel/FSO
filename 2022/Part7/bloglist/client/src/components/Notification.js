import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (!notification) return null;

  return (
    <div>
      <Alert severity={notification.type}>{notification.text}</Alert>
    </div>
  );
};

export default Notification;
