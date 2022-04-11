import { BrowserRouter } from "react-router-dom";
import { QueueProvider } from "./QueueProvider";

function App() {
  const handleClick = async () => {
    const res = await fetch(process.env.REACT_APP_API_URL, {
      credentials: "include",
      Cache: "no-cache",
    });

    if (res.redirected) {
      window.location.href = res.url;
    }
  };

  return (
    <BrowserRouter>
      <QueueProvider>
        <button onClick={handleClick}>TEST</button>
      </QueueProvider>
    </BrowserRouter>
  );
}

export default App;
