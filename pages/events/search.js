import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function SearchPage(props) {
  const { events } = props;

  const router = useRouter();

  return (
    <Layout title='Search Results'>
      <Link href='/events'>Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.data.map((evt, i) => (
        <EventItem key={i} evt={evt.attributes} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        {
          name: {
            $containsi: term,
          },
        },
        {
          performers: {
            $containsi: term,
          },
        },
        {
          description: {
            $containsi: term,
          },
        },
        {
          venue: {
            $containsi: term,
          },
        },
      ],
    },
    populate: ['image'],
  });

  const res = await fetch(`${API_URL}/api/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}
