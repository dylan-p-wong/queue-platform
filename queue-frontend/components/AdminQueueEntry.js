import styles from '../styles/Home.module.css';
import moment from "moment";

export default function AdminQueueEntry({ queueEntry }) {
  return (
    <div className={styles.card} style={{ backgroundColor: queueEntry.status === "PASSED" ? 'lime' : 'yellow', margin: 4 }}>
      <p>Queue ID: {queueEntry.queue_id}</p>
      <p>Email: {queueEntry.email}</p>
      <p>Created At: {moment(queueEntry.created_at).format("h:mm:ss a")}</p>
      <p>Updated At: {moment(queueEntry.updated_at).format("h:mm:ss a")}</p>
      <p>Status: {queueEntry.status}</p>
    </div>
  )
}
