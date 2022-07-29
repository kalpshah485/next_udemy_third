import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { DUMMY_EVENT, getAllEvents } from '../../helpers/api-utils';

const Events: NextPage<{
  events: DUMMY_EVENT[]
}> = ({ events }) => {
  const router = useRouter();

  function findEventsHandler(year: string | undefined, month: string | undefined) {
    const fullpath = `/events/${year}/${month}`;

    router.push(fullpath);
  }
  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events: DUMMY_EVENT[] = await getAllEvents();
  
  return {
    props: {
      events
    }
  }
}

export default Events;