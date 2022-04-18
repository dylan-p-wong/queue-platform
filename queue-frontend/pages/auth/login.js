import { useState } from "react";
import PanelLayout from "../../components/layout/PanelLayout";
import styles from '../../styles/Home.module.css'

export default function Login() {
  const [data, setData] = useState({});

  const onChange = (e) => {
    data[e.target.name] = e.target.value;
  } 

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
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
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
            <label>Email
              <input style={{ width: '100%', padding: 8 }} name="email" onChange={onChange} type="text" />
            </label>

            <label>Password
              <input style={{ width: '100%', padding: 8 }} name="password" onChange={onChange} type="text" />
            </label>
          <button className={styles.button} type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

Login.getLayout = function getLayout(page) {
  return <PanelLayout>{page}</PanelLayout>;
};
