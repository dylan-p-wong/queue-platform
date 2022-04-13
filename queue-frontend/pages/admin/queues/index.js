import { useEffect, useState } from "react"
import AdminQueue from "../../../components/AdminQueue";

export default function AdminQueues() {
  const [refreshCount, setRefershCount] = useState(0);
  const [queues, setQueues] = useState([]);

  const refresh = () => {
    setRefershCount(refreshCount + 1);
  }

  const getQueues = async () => {
    const res = await fetch(`/api/admin/queue/`, {
      credentials: 'include'
    });
    const data = await res.json();
    setQueues(data);
  }

  useEffect(() => {
    getQueues();
  }, [refreshCount]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {queues.map(queue => (
          <AdminQueue refresh={refresh} queue={queue}/>
      ))}
    </div>
  )
}
