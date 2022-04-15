import { useEffect, useState } from "react"
import Link from "next/link";
import AdminQueueEntry from "./AdminQueueEntry";

export default function AdminQueue({ queue, refresh, showEntries }) {

  const startQueue = async () => {
    const res = await fetch(`/api/admin/queue/${queue.id}/start`, {
      method: 'POST',
      credentials: 'include'
    });
    const data = await res.json();
    refresh();
  }

  const stopQueue = async () => {
    const res = await fetch(`/api/admin/queue/${queue.id}/stop`, {
      method: 'POST',
      credentials: 'include'
    });
    const data = await res.json();
    refresh();
  }

  const deleteQueue = async () => {
    const res = await fetch(`/api/admin/queue/${queue.id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await res.json();
    refresh();
  }

  return (
    <div key={queue.id} style={{ border: '1px solid black', margin: 24 }}>
      <p>id: {queue.id}</p>
      <p>title: {queue.title}</p>
      <p>description: {queue.description}</p>
      <p>created_at: {queue.created_at}</p>
      <p>updated_at: {queue.updated_at}</p>
      <p>active: {queue.stopped ? "STOPPED" : "RUNNING"}</p>
      <p>entries: {queue.queue_entries.length}</p>
      <p>passed: {queue.queue_entries.reduce((total, val) => val.status === "PASSED" ? total + 1 : total, 0)}</p>
      <p>waiting: {queue.queue_entries.reduce((total, val) => val.status === "WAITING" ? total + 1 : total, 0)}</p>
      <button onClick={deleteQueue}>Delete</button>
      <button onClick={startQueue}>Start</button>
      <button onClick={stopQueue}>Stop</button>
      <button onClick={refresh}>Refresh</button>
      <Link href={`/admin/queues/${queue.id}`}>
        <button>Expanded View</button>
      </Link>
      <Link href={`/queues/${queue.id}`}>
        <button>Go to Queue</button>
      </Link>
      {showEntries && <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {queue.queue_entries.map(queueEntry => (
          <AdminQueueEntry queueEntry={queueEntry}/>
        ))}
      </div>}
    </div>
  )
}
