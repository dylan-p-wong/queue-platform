import { useState } from "react";

export default function Login() {
  const [data, setData] = useState({});

  const onChange = (e) => {
    data[e.target.name] = e.target.value;
  } 

  const onSubmit = async (e) => {
    e.preventDefault();

    

    if (res.redirected) {
      window.location.href = res.url;
    }
  }

  return (
    <div>
      <h1>Create Queue</h1>
      <form onSubmit={onSubmit}>
        <label>Title:
          <input name="title" onChange={onChange} type="text" />
        </label>
        <label>Description:
          <input name="description" onChange={onChange} type="text" />
        </label>
        <label>Token time (minutes):
          <input name="description" onChange={onChange} type="number" />
        </label>
        <label>Passes (per minute):
          <input name="description" onChange={onChange} type="number" />
        </label>
        <label>Redirect root domain:
          <input name="description" onChange={onChange} type="number" />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
