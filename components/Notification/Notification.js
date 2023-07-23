import React from "react";
import Snackbar from '@mui/material/Snackbar';

let globalSetNotificationState = null;
export const Notification = {
  show: (message) => {
    globalSetNotificationState(old => ({ ...old, open: true, message: message }));
  }
}

export default function NotificationWidget() {
  const [notificationState, setNotificationState] = React.useState({
    open: false,
    message: "Notification",
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { open, message, vertical, horizontal, onClose } = notificationState;
  globalSetNotificationState = setNotificationState;

  return (
    <div>
      <Snackbar
        anchorOrigin={{ horizontal, vertical }}
        autoHideDuration={3000}
        open={open}
        onClose={() => setNotificationState({ ...notificationState, open: false })}
        message={message}
        bodyStyle={{backgroundColor: "red", color: "white"}}
        key={vertical + horizontal}
      />
    </div>
  );
}
