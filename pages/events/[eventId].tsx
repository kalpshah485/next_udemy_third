import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import EventContent from '../../components/event-detail/EventContent';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventSummary from '../../components/event-detail/EventSummary';
import { getAllEvents, getEventById } from '../../helpers/api-utils';
import type { DUMMY_EVENT } from '../../helpers/api-utils';
import ErrorAlert from '../../components/ui/ErrorAlert';

const EventDetailPage: NextPage<{
  selectedEvent: DUMMY_EVENT
}> = ({ selectedEvent: event }) => {
  return (
    event ?
      <>
        <EventSummary title={event.title} />
        <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </>
      :
      <>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
      </>
  )
}

export const getStaticPaths : GetStaticPaths = async () => {
  const events = await getAllEvents();

  const paths = events.map(event => ({
    params: {
      eventId: event.id
    }
  }))
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId: string = context.params && context.params.eventId ? context.params.eventId.toString() : '';
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event ? event : null
    }
  }
}

export default EventDetailPage;