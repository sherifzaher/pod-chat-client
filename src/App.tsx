import { Route, Routes } from 'react-router-dom';

import RegisterPage from '@/pages/register-page';
import LoginPage from '@/pages/login-page';
import ConversationChannelPage from '@/pages/conversation-channel-page';
import ConversationsPage from '@/pages/conversation-page';

import AuthenticatedRoutes from '@/components/authenticated-routes';

import { AuthProvider } from '@/context/auth-context';
import { socket, SocketContext } from '@/context/socket-context';

function App() {
  return (
    <AuthProvider>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="conversations"
            element={
              <AuthenticatedRoutes>
                <ConversationsPage />
              </AuthenticatedRoutes>
            }
          >
            <Route path=":id" element={<ConversationChannelPage />} />
          </Route>
        </Routes>
      </SocketContext.Provider>
    </AuthProvider>
  );
}

export default App;
