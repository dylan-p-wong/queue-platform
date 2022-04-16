import { useState } from "react";
import PanelLayout from "../../../components/layout/PanelLayout";

export default function CreateQueue() {
  const [data, setData] = useState({});

  const onChange = (e) => {
    if (e.target.type === 'number') {
      data[e.target.name] = parseInt(e.target.value);
    } else {
      data[e.target.name] = e.target.value;
    }
    setData(data);
  } 

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/admin/queue/', {
      method: 'POST',
      body: JSON.stringify(data)
    });

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
        <label>Token time (milliseconds):
          <input name="token_time" onChange={onChange} type="number" />
        </label>
        <label>Passes every x milliseconds:
          <input name="pass_rate" onChange={onChange} type="number" />
        </label>
        <label>Redirect root domain:
          <input name="redirect_domain" onChange={onChange} type="text" />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

CreateQueue.getLayout = function getLayout(page) {
  return <PanelLayout>{page}</PanelLayout>;
};