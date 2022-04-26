const Notification = ({ notification }) => {
  if (!notification) return null;

  return (
    <div>
      <p className={notification.type}>{notification.message}</p>
    </div>
  );
};

export default Notification;
