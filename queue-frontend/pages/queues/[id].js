import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInterval } from '../../components/useInterval';
import UserQueue from '../../components/UserQueue';

function Queue({ id, redirect }) {
  const [queueEntry, setQueueEntry] = useState(null);
  const [error, setError] = useState(false);

  const redirectBack = async () => {
    const res = await fetch(`/api/queue/${id}/redirect`);
    
    if (res.redirected) {
      window.location.href = res.url;
    }
  };

  const getQueueEntry = async () => {
    const res = await fetch(`/api/queue/${id}/entry`, {
      method: 'POST',
      body: JSON.stringify({ redirect })
    });
    const data = await res.json();

    if (data.error) {
      setError(data.error);
    }
    setQueueEntry(data);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getQueueEntry();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    )
  }

  if (!queueEntry) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <UserQueue queueEntry={queueEntry} redirectBack={redirectBack}/>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  return { props: { id, redirect: ctx.req.headers.referer ? ctx.req.headers.referer : null } };
};


export default Queue
