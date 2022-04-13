import { useEffect, useState } from "react"

export default function AdminIndex() {
  const [user, setUser] = useState(null);
  
  const getUser = async () => {
    const res = await fetch(`/api/user`);
    const data = await res.json();
    setUser(data);
  }

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return (
      <div>
        No User
      </div>
    )
  }

  return (
    <div>
      <h1>Admin panel</h1>
      <p>User ID: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}
