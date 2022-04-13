import { useEffect, useState } from 'react';
import AdminQueue from '../../../components/AdminQueue';

function AdminQueuePage({ id }) {
  const [refreshCount, setRefershCount] = useState(0);
  const [queue, setQueue] = useState(null);

  const refresh = () => {
    setRefershCount(refreshCount + 1);
  }

  const getQueue = async () => {
    const res = await fetch(`/api/admin/queue/${id}`, {
      credentials: 'include'
    });
    const data = await res.json();
    setQueue(data);
  }

  useEffect(() => {
    getQueue();
  }, [refreshCount]);

  if (!queue) {
    return (
      <div>
        <h1>No Queue</h1>
      </div>
    );
  }

  return (
    <div>
      <div>
        <AdminQueue refresh={refresh} queue={queue} showEntries={true}/>
        <h1>{id}</h1>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  return { props: { id } };
};

export default AdminQueuePage
