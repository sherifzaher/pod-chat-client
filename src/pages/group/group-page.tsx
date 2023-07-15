import { useEffect } from 'react';
import {Outlet, useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store';
import { Page } from '../../utils/styles';
import ConversationSidebar from '../../components/conversations/conversation-sidebar';
import ConversationPanel from '../../components/conversations/conversation-panel';
import {fetchGroupThunk} from "../../store/slices/group-slice";
import {updateType} from "../../store/slices/selected-slice";

function GroupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  useEffect(() => {
    dispatch(updateType('group'));
    dispatch(fetchGroupThunk());
  }, []);

  return (
    <Page>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
}

export default GroupPage;
