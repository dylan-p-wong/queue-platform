import { BrowserRouter } from "react-router-dom";
import { QueueProvider } from "./QueueProvider";

function App() {
  const handleClick = async () => {
    const res = await fetch('http://localhost:4444')

    console.log(res)

    if (res.redirected) {
      window.location.href = res.url;
    }
  }

  return (
    <BrowserRouter>
      <QueueProvider>
        <button onClick={handleClick}>TEST</button>
      </QueueProvider>
    </BrowserRouter>
  );
}

export default App;
