import { Route, Routes } from 'react-router-dom';

import RegisterPage from '@/pages/register-page';
import LoginPage from '@/pages/login-page';
import ConversationChannelPage from '@/pages/conversation-channel-page';
import ConversationsPage from '@/pages/conversation-page';

import AuthenticatedRoutes from '@/components/authenticated-routes';
import AppWithProviders from "@/components/app-with-providers";

function App() {
  return (
    <AppWithProviders>
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
    </AppWithProviders>
  );
}

export default App;
