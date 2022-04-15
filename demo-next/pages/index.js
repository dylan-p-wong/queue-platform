import { useState } from "react";

export default function Home() {
  const [protectedData, setProtectedData] = useState("");

  const callQueueProtectedRoute = async () => {
    const res = await fetch('/api/queue-protected/hello');
  
    if (res.redirected) {
      window.location.href = res.url;
    }

    const data = await res.json();
    setProtectedData(JSON.stringify(data));
  }

  return (
    <div>
      {protectedData && <p id="protected-data">{protectedData}</p>}
      <button id="protected" onClick={callQueueProtectedRoute}>Route that needs to be protected</button>
    </div>
  )
}
