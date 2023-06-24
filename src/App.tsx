import { Route, Routes } from 'react-router-dom';

import RegisterPage from '@/pages/register-page';
import LoginPage from '@/pages/login-page';
import ConversationChannelPage from '@/pages/conversation-channel-page';
import ConversationsPage from '@/pages/converstaions-page';

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="conversations" element={<ConversationsPage />}>
          <Route path=":id" element={<ConversationChannelPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
