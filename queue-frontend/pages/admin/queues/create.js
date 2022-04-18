import { useState } from "react";
import PanelLayout from "../../../components/layout/PanelLayout";
import styles from '../../../styles/Home.module.css';

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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: 500 }}>
        <h1>Create Queue</h1>
        <form onSubmit={onSubmit}>
          <label>Title:
            <input style={{ width: '100%', padding: 8 }} name="title" onChange={onChange} type="text" />
          </label>
          <label>Description:
            <input style={{ width: '100%', padding: 8 }} name="description" onChange={onChange} type="text" />
          </label>
          <label>Token time (milliseconds):
            <input style={{ width: '100%', padding: 8 }} name="token_time" onChange={onChange} type="number" />
          </label>
          <label>Passes every x milliseconds:
            <input style={{ width: '100%', padding: 8 }} name="pass_rate" onChange={onChange} type="number" />
          </label>
          <label>Redirect root domain:
            <input style={{ width: '100%', padding: 8 }} name="redirect_domain" onChange={onChange} type="text" />
          </label>
          <button className={styles.button} type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}

CreateQueue.getLayout = function getLayout(page) {
  return <PanelLayout>{page}</PanelLayout>;
};