import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchConversationsThunk } from '../store/slices/conversation-slice';
import { Page } from '../utils/styles';
import ConversationSidebar from '../components/conversations/conversation-sidebar';
import ConversationPanel from '../components/conversations/conversation-panel';

function ConversationsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchConversationsThunk());
  }, []);

  return (
    <Page>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
}

export default ConversationsPage;
