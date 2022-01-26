import Link from 'next/link';
import Layout from '@/components/Layout';
import qs from 'qs';
import { API_URL } from '@/config/index';
import EventItem from '@/components/EventItem';

export default function HomePage(props) {
  const { events } = props;

  return (
    <>
      <Layout>
        <h1>Upcoming Events</h1>
        {events.length === 0 && <h3>No events to show</h3>}
        {events.data.map((evt, i) => (
          <EventItem key={i} evt={evt.attributes} />
        ))}

        {events.length > 0 && (
          <Link href='/events'>
            <a className='btn-secondary'>View All Events</a>
          </Link>
        )}
      </Layout>
    </>
  );
}

const query = qs.stringify(
  {
    sort: ['date:desc'],
    pagination: {
      start: 1,
      limit: 3,
    },
    populate: ['image'],
  },

  {
    encodeValuesOnly: true,
  }
);

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}
