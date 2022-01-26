import Layout from '@/components/Layout';
import qs from 'qs';
import { API_URL } from '@/config/index';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';

export default function HomePage(props) {
  const { events, page, PER_PAGE } = props;

  const totalEntries = events.meta.pagination.total;

  return (
    <>
      <Layout>
        <h1>Events</h1>
        {events.length === 0 && <h3>No events to show</h3>}
        {events.data.map((evt, i) => (
          <EventItem key={i} evt={evt.attributes} />
        ))}

        <Pagination page={page} total={totalEntries} perPage={PER_PAGE} />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const PER_PAGE = 4;

  const query = qs.stringify(
    {
      sort: ['date:asc'],
      pagination: {
        start: page,
        limit: PER_PAGE,
      },
      populate: ['image'],
    },

    {
      encodeValuesOnly: true,
    }
  );

  const eventRes = await fetch(`${API_URL}/api/events?${query}`);
  const events = await eventRes.json();

  return {
    props: { events, page: +page, PER_PAGE },
  };
}
