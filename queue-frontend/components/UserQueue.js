import styles from '../styles/Home.module.css';
import moment from "moment";

export default function UserQueue({ queueEntry, redirectBack }) {
  return (
    <div
      className={styles.card}
      style={{
        backgroundColor: queueEntry.status === "PASSED" ? "lime" : "yellow",
        margin: 4,
      }}
    >
      <p style={{ textAlign: 'center' }}>Entered at: {moment(queueEntry.created_at).format("h:mm:ss a")}</p>
      <p style={{ textAlign: 'center' }}>Status {queueEntry.status}</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {queueEntry.redirect_token ? 
          (
          <button className={styles.button} id='redirect-back' onClick={redirectBack}>Take me back</button>
          ) 
          : 
          (
          <button className={styles.button}>#{queueEntry.place} in line</button>
          )
        }
      </div>
      <p style={{ fontSize: 10, textAlign: 'center' }}>Entry ID: {queueEntry.id}</p>
      <p style={{ fontSize: 10, textAlign: 'center' }}>Queue ID: {queueEntry.queue_id}</p>
    </div>
  );
}