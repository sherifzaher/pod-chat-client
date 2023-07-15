import {useNavigate} from "react-router-dom";
import {ConversationSidebarItemStyle} from "../../utils/styles";
import styles from "./index.module.scss";
import {getRecipientFromConversation} from "../../utils/helpers";
import {useAuthContext} from "../../context/auth-context";

type Props = {
  conversation: Conversation;
}

export default function ConversationSidebarItem({ conversation }: Props){
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const recipient = getRecipientFromConversation(conversation, user!);

  return (
    <ConversationSidebarItemStyle
      onClick={() => navigate(`/conversations/${conversation.id}`)}
    >
      <div className={styles.conversationAvatar} />
      <div>
        <span className={styles.conversationName}>
          {recipient.firstName} {recipient.lastName}
        </span>
        <span className={styles.conversationLastMessage}>
          {conversation.lastMessageSent?.content}
        </span>
      </div>
    </ConversationSidebarItemStyle>
  )
}
