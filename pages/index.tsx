import type { GetStaticProps, NextPage } from 'next';
import { getFeaturedEvents } from '../helpers/api-utils';
import type { DUMMY_EVENT } from '../helpers/api-utils';
import EventList from '../components/events/EventList';

const Home: NextPage<{
  events: DUMMY_EVENT[]
}> = ({ events }) => {
  return (
    <div>
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

