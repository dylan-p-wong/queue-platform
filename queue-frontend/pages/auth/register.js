import { useState } from "react";

export default function Login() {
  const [data, setData] = useState({});

  const onChange = (e) => {
    data[e.target.name] = e.target.value;
  } 

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (res.redirected) {
      window.location.href = res.url;
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <label>Email:
          <input name="email" onChange={onChange} type="text" />
        </label>
        <label>Password:
          <input name="password" onChange={onChange} type="text" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
