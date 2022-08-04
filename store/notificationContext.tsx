import { createContext, useState, useEffect, MouseEventHandler } from 'react';

type Notification = {
  title: string;
  message: string;
  status: "pending" | "success" | "error";
}

type NotificationContextType = {
  notification: Notification | null;
  showNotification: (notification: Notification) => void;
  hideNotification: MouseEventHandler<HTMLDivElement>;
}

const NotificationContext = createContext<NotificationContextType>({
  notification: null, // { title, message, status }
  showNotification: function (notificationData: Notification) { },
  hideNotification: function () { },
});

export function NotificationContextProvider(props: {
  children?: React.ReactNode
}) {
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData: Notification) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;