import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInterval } from '../../components/useInterval';

function Queue({ id }) {
  const [queueEntry, setQueueEntry] = useState(null);
  const [error, setError] = useState(false);

  const redirectBack = async () => {
    const res = await fetch(`/api/queue/${id}/redirect`);
    
    if (res.redirected) {
      window.location.href = res.url;
    }
  };

  const getQueueEntry = async () => {
    const res = await fetch(`/api/queue/${id}/entry`);
    const data = await res.json();

    if (data.error) {
      setError(true);
    }
    setQueueEntry(data);
  };

  useInterval(() => {
    getQueueEntry();
  }, 1000)

  if (error) {
    return (
      <div>
        <p>Invalid queue configuration</p>
      </div>
    )
  }

  if (!queueEntry) {
    return (
      <div>
        <h1>No entry</h1>
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
      <p>Redirect token {queueEntry.redirect_token}</p>
      {queueEntry.redirect_token && <button id='redirect-back' onClick={redirectBack}>Take me back</button>}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  return { props: { id } };
};


export default Queue
