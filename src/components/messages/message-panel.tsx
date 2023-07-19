import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MessagePanelBody, MessagePanelStyle, MessageTypingStatus } from '../../utils/styles';
import MessagePanelHeader from './message-panel-header';
import MessageContainer from './message-container';
import MessageInputField from './message-input-field';
import { RootState } from '../../store';
import { useAuthContext } from '../../context/auth-context';
import { getRecipientFromConversation } from '../../utils/helpers';

type Props = {
  isRecipientTyping: boolean;
};

export default function MessagePanel({ isRecipientTyping }: Props) {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { conversations, loading } = useSelector((state: RootState) => state.conversations);
  const conversation = conversations.find((conv) => conv.id === Number(id!));

  return (
    <MessagePanelStyle>
      <MessagePanelHeader />
      <MessagePanelBody>
        <MessageContainer />
        <MessageInputField />
        <MessageTypingStatus isRecipientTyping={isRecipientTyping}>
          {isRecipientTyping &&
            `${getRecipientFromConversation(conversation!, user!).firstName} is typing ...`}
        </MessageTypingStatus>
      </MessagePanelBody>
    </MessagePanelStyle>
  );
}
