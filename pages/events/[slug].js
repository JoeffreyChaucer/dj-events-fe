import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { parseCookies } from '@/helpers/index';
import Link from 'next/link';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import Layout from '@/components/Layout';
import EventMap from '@/components/EventMap';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import qs from 'qs';

export default function EventPage({ evt, token }) {
  const { user } = useContext(AuthContext);

  const router = useRouter();

  const {
    data: [{ attributes: event }],
  } = evt;

  const imageMedium = event.image.data.attributes.formats.medium.url;

  // const deleteEvent = async (e) => {
  //   if (confirm('Are you sure?')) {
  //     const res = await fetch(`${API_URL}/events/${evt.id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       toast.error(data.message);
  //     } else {
  //       router.push('/events');
  //     }
  //   }
  // };

  return (
    <Layout>
      <div className={styles.event}>
        {/* {user && user.id === evt.user.id ? (
          <div className={styles.controls}>
            <Link href={`/events/edit/${evt.id}`}>
              <a>
                <FaPencilAlt /> Edit Event
              </a>
            </Link>
            <a href='#' className={styles.delete} onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </div>
        ) : (
          <div className={styles.controls}>
            <h3>Organizer: {evt.user.username}</h3>
          </div>
        )}
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span> */}
        <h1>{event.name}</h1>
        <ToastContainer />
        {event.image && (
          <div className={styles.image}>
            <Image
              src={imageMedium}
              width={960}
              height={600}
              alt={event.name}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <EventMap evt={event}></EventMap>

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug }, req }) {
  // const { token } = parseCookies(req);

  console.log(slug);
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ['image'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${API_URL}/api/events?${query}`);

  const events = await res.json();

  return {
    props: {
      evt: events,
      // token,
    },
  };
}
