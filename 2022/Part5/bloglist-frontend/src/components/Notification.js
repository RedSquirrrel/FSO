import PropTypes from 'prop-types';

const Notification = ({ notification }) => {
  if (!notification) return null;

  return (
    <div>
      <p className={notification.type}>{notification.message}</p>
    </div>
  );
};

Notification.prototype = {
  notification: PropTypes.object.isRequired,
};

export default Notification;
