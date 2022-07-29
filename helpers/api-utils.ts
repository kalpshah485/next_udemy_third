export type DUMMY_EVENT = {
  id: string,
  title: string,
  description: string,
  location: string,
  date: string,
  image: string,
  isFeatured: boolean,
}

export async function getAllEvents(): Promise<DUMMY_EVENT[]> {
  const res: Response = await fetch('https://next-udemy-first-default-rtdb.firebaseio.com/events.json');
  const data = await res.json();
  const events: DUMMY_EVENT[] = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key]
    });
  }
  return events;
}

export async function getFeaturedEvents(): Promise<DUMMY_EVENT[]> {
  const allEvents: DUMMY_EVENT[] = await getAllEvents();
  return allEvents.filter(event => event.isFeatured);
}

export async function getEventById(id: string): Promise<DUMMY_EVENT | undefined> {
  const allEvents: DUMMY_EVENT[] = await getAllEvents();
  return allEvents.find((event) => {
    return event.id === id
  });
}

export async function getFilteredEvents(dateFilter: { year: number; month: number; }) {
  const { year, month } = dateFilter;

  const allEvents: DUMMY_EVENT[]= await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}