export default function AdminQueueEntry({ queueEntry }) {
  return (
    <div style={{ backgroundColor: queueEntry.status === "PASSED" ? 'lime' : 'yellow', margin: 4 }}>
      <p>Queue ID: {queueEntry.queue_id}</p>
      <p>Email: {queueEntry.email}</p>
      <p>Created At: {queueEntry.created_at}</p>
      <p>Updated At: {queueEntry.updated_at}</p>
      <p>Status: {queueEntry.status}</p>
    </div>
  )
}
