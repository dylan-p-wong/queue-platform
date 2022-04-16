import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInterval } from '../../components/useInterval';

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
    <div
      style={{
        backgroundColor: queueEntry.status === "PASSED" ? "lime" : "yellow",
        margin: 4,
      }}
    >
      <p>Entry ID: {queueEntry.id}</p>
      <p>Queue ID: {queueEntry.queue_id}</p>
      <p>Email: {queueEntry.email}</p>
      <p>Created At: {queueEntry.created_at}</p>
      <p>Updated At: {queueEntry.updated_at}</p>
      <p>Status {queueEntry.status}</p>
      <p>Place in line: {queueEntry.place}</p>
      <p>Redirect token {queueEntry.redirect_token}</p>
      {queueEntry.redirect_token && <button id='redirect-back' onClick={redirectBack}>Take me back</button>}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  return { props: { id, redirect: ctx.req.headers.referer ? ctx.req.headers.referer : null } };
};


export default Queue
