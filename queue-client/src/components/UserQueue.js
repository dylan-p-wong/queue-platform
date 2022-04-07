import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function UserQueue() {
  const [queueEntry, setQueueEntry] = useState(null);
  const { id } = useParams();

  const redirectBack = async () => {
    const res = await fetch(`http://localhost:8080/queue/${id}/entry/redirect`, { credentials: 'include', 'Cache': 'no-cache' });

    if (res.redirected) {
      window.location.href = res.url;
    }
  }

  const getQueueEntry = async () => {
    const res = await fetch(`http://localhost:8080/queue/${id}/entry`, {
      credentials: 'include'
    });
    const data = await res.json();
    setQueueEntry(data);
  }

  useEffect(() => {
    getQueueEntry();
  }, []);

  if (!queueEntry) {
    return (
      <div>
        <h1>No entry</h1>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: queueEntry.status === "PASSED" ? 'lime' : 'yellow', margin: 4 }}>
      <p>Entry ID: {queueEntry.id}</p>
      <p>Queue ID: {queueEntry.queue_id}</p>
      <p>Email: {queueEntry.email}</p>
      <p>Created At: {queueEntry.created_at}</p>
      <p>Updated At: {queueEntry.updated_at}</p>
      <p>Status {queueEntry.status}</p>
      <button onClick={redirectBack}>Take me back</button>
    </div>
  );
}
