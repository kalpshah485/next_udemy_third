import type { NextPage } from 'next';
// import { getFilteredEvents } from '../../helpers/api-utils';
import type { DUMMY_EVENT } from '../../helpers/api-utils';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

// <{
//   hasError?: boolean;
//   filteredEvents: DUMMY_EVENT[];
//   date: {
//     year: number;
//     month: number;
//   }
// }> 
const FilteredEventsPage: NextPage = () => {
  const [loadedEvents, setLoadedEvents] = useState<DUMMY_EVENT[]>();
  const router = useRouter();
  const filterData = router.query?.slug;
  const fetcher = async (url: RequestInfo | URL) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  const { data, error } = useSWR('https://next-udemy-first-default-rtdb.firebaseio.com/events.json', fetcher);
  
  useEffect(() => {
    if (data) {
      const events: DUMMY_EVENT[] = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        })
      }
      setLoadedEvents(events);
    }
  }, [data]);
  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData ? filterData[0] : '';
  const filteredMonth = filterData ? filterData[1] : '';

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link='/events'>Show all events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <>
      <ErrorAlert>
        <p>No events found for the chosen filter!</p>
      </ErrorAlert>
    </>
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { params } = context;
//   const filterData: string | string[] | undefined = params?.slug;
//   const filteredYear = filterData ? filterData[0] : '';
//   const filteredMonth = filterData ? filterData[1] : '';

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
//     return {
//       props: {
//         hasError: true,
//       }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth
//   })

//   return {
//     props: {
//       filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     }
//   }
// }

export default FilteredEventsPage;