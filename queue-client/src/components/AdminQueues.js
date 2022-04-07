import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import AdminQueue from "./AdminQueue";

export default function AdminQueues() {
  const [refreshCount, setRefershCount] = useState(0);
  const [queues, setQueues] = useState([]);

  const refresh = () => {
    setRefershCount(refreshCount + 1);
  }

  const getQueues = async () => {
    const res = await fetch(`http://localhost:8080/queue/`, {
      credentials: 'include'
    });
    const data = await res.json();
    setQueues(data);
  }

  useEffect(() => {
    getQueues();
  }, [refreshCount]);

  return (
    <div>
      <div>
        {queues.map(queue => (
            <AdminQueue refresh={refresh} queue={queue}/>
        ))}
      </div>
    </div>
  )
}