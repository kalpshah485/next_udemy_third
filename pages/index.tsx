import type { GetStaticProps, NextPage } from 'next';
import { getFeaturedEvents } from '../helpers/api-utils';
import type { DUMMY_EVENT } from '../helpers/api-utils';
import EventList from '../components/events/EventList';
import NewsletterRegistration from '../components/input/NewsletterRegistration';
import Head from 'next/head';

const Home: NextPage<{
  events: DUMMY_EVENT[]
}> = ({ events }) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta 
        name="description"
        content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    }
  }
}

export default Home;

