import { Outlet, Route, Routes } from 'react-router-dom';
import RegisterPage from '@/pages/register-page';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
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
