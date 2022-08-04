import React, { useContext } from 'react';
import NotificationContext from '../../store/notificationContext';
import Notification from '../ui/Notification';
import MainHeader from './MainHeader';

export default function Layout(props: {
  children: React.ReactNode
}) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;
  return (
    <>
      <MainHeader />
      <main>
        {props.children}
      </main>
      {
        activeNotification && (
          <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />
        )
      }
    </>
  )
}
