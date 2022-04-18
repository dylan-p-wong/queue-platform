import { useEffect, useState } from "react";
import Link from "next/link";
import AdminQueueEntry from "./AdminQueueEntry";
import styles from "../styles/Home.module.css";
import moment from "moment";

export default function AdminQueue({ queue, refresh, showEntries }) {
  const startQueue = async () => {
    const res = await fetch(`/api/admin/queue/${queue.id}/start`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    refresh();
  };

  const stopQueue = async () => {
    const res = await fetch(`/api/admin/queue/${queue.id}/stop`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    refresh();
  };

  const deleteQueue = async () => {
    const res = await fetch(`/api/admin/queue/${queue.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    refresh();
  };

  return (
    <>
      <div className={styles.card} key={queue.id} style={{ maxWidth: 350, margin: 4, lineHeight: 0.5 }}>
        <p style={{ fontSize: 10 }}>id: {queue.id}</p>
        <p style={{ fontSize: 10 }}>secret_key: {queue.secret_key}</p>
        <p>title: {queue.title}</p>
        <p>description: {queue.description}</p>
        <p>redirect: {queue.redirect_domain}</p>
        <p>
          created_at: {moment(queue.created_at).format("DD/MM/YYYY, h:mm:ss a")}
        </p>
        <p>
          updated_at: {moment(queue.updated_at).format("DD/MM/YYYY, h:mm:ss a")}
        </p>
        <p>active: {queue.stopped ? "STOPPED" : "RUNNING"}</p>
        <p>entries: {queue.queue_entries?.length}</p>
        <p>
          passed:{" "}
          {queue.queue_entries.reduce(
            (total, val) => (val.status === "PASSED" ? total + 1 : total),
            0
          )}
        </p>
        <p>
          waiting:{" "}
          {queue.queue_entries.reduce(
            (total, val) => (val.status === "WAITING" ? total + 1 : total),
            0
          )}
        </p>
        <button
          className={styles.button}
          onClick={startQueue}
          style={{ backgroundColor: "green" }}
        >
          Start
        </button>
        <button
          className={styles.button}
          onClick={stopQueue}
          style={{ backgroundColor: "red" }}
        >
          Stop
        </button>
        <button className={styles.button} onClick={refresh}>
          Refresh
        </button>
        <Link href={`/admin/queues/${queue.id}`}>
          <button className={styles.button}>Expanded View</button>
        </Link>
        <Link href={`/queues/${queue.id}`}>
          <button className={styles.button}>Go to Queue</button>
        </Link>
        <button
          className={styles.button}
          onClick={deleteQueue}
          style={{ backgroundColor: "red" }}
        >
          Delete
        </button>
      </div>
    </>
  );
}
