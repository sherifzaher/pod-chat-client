import { Route, Routes } from 'react-router-dom';
import { enableMapSet } from 'immer';

import AppWithProviders from './components/app-with-providers';
import AuthenticatedRoutes from './components/authenticated-routes';

import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ConversationsPage from './pages/conversation-page';
import ConversationChannelPage from './pages/conversation-channel-page';
import GroupPage from "./pages/group/group-page";
import GroupChannelPage from "./pages/group/group-channel-page";

enableMapSet();

function App() {
  return (
    <AppWithProviders>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/conversations"
          element={
            <AuthenticatedRoutes>
              <ConversationsPage />
            </AuthenticatedRoutes>
          }
        >
          <Route path=":id" element={<ConversationChannelPage />} />
        </Route>
        <Route
          path="/groups"
          element={
            <AuthenticatedRoutes>
              <GroupPage />
            </AuthenticatedRoutes>
          }
        >
          <Route path=":id" element={<GroupChannelPage />} />
        </Route>
      </Routes>
    </AppWithProviders>
  );
}

export default App;
