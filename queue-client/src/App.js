import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminQueues from "./components/AdminQueues";
import Main from "./components/Main";
import UserQueue from "./components/UserQueue";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Main />}/>
          <Route path="queue">
            <Route path=":id" element={<UserQueue />}/>
          </Route>
          <Route path="admin">
            <Route path="queues" element={<AdminQueues />}/>
          </Route>
          <Route path="*" element={<h1>Not Found</h1>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;