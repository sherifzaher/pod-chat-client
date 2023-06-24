import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Hello, name</div>} />
        <Route
          path="conversations"
          element={
            <div>
              <div>Conversations</div>
              <Outlet />
            </div>
          }
        >
          <Route path=":id" element={<div>Conversation ID Page</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
