import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

export default function EventItem({ evt }) {
  const { image } = evt;

  const thumbnail = image.data.attributes.formats.thumbnail.url;

  console.log(evt.slug);

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={image ? thumbnail : '/images/event-default.png'}
          width={170}
          height={100}
          alt={evt.name}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className='btn'>Detail</a>
        </Link>
      </div>
    </div>
  );
}
