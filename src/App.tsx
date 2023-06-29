import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

import RegisterPage from '@/pages/register-page';
import LoginPage from '@/pages/login-page';
import ConversationChannelPage from '@/pages/conversation-channel-page';
import ConversationsPage from '@/pages/conversation-page';
import {useAuth} from "@/hooks/useAuth";

function RequireAuth({children}: { children: React.ReactNode}){
  const auth = useAuth();
  const location = useLocation();

  if(auth.isLoading) return null;

  if(!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="conversations" element={
        <RequireAuth>
          <ConversationsPage />
        </RequireAuth>
      }>
        <Route path=":id" element={<ConversationChannelPage />} />
      </Route>
    </Routes>
  );
}

export default App;
