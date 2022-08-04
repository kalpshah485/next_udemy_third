import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import Head from 'next/head';
import { NotificationContextProvider } from '../store/notificationContext';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="NextJS Events" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  )
}

export default MyApp
