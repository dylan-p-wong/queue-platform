import { useState } from "react";

export default function Login() {
  const [data, setData] = useState({});

  const onChange = (e) => {
    data[e.target.name] = e.target.value;
  } 

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  return (
    <div>
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
