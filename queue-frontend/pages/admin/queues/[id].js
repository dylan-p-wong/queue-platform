import { useEffect, useState } from 'react';
import AdminQueue from '../../../components/AdminQueue';
import AdminQueueEntry from '../../../components/AdminQueueEntry';
import PanelLayout from '../../../components/layout/PanelLayout';

function AdminQueuePage({ id }) {
  const [refreshCount, setRefershCount] = useState(0);
  const [queue, setQueue] = useState(null);
  const [error, setError] = useState(null);

  const refresh = () => {
    setRefershCount(refreshCount + 1);
  }

  const getQueue = async () => {
    const res = await fetch(`/api/admin/queue/${id}`, {
      credentials: 'include'
    });
    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      setQueue(data);
    }
  }

  useEffect(() => {
    getQueue();
  }, [refreshCount]);

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  if (!queue) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <AdminQueue refresh={refresh} queue={queue} showEntries={true}/>
      </div>
      <div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {queue.queue_entries.map((queueEntry) => (
            <AdminQueueEntry queueEntry={queueEntry} />
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  return { props: { id } };
};

AdminQueuePage.getLayout = function getLayout(page) {
  return <PanelLayout>{page}</PanelLayout>;
};

export default AdminQueuePage
