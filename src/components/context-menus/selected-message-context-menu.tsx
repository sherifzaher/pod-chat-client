import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ContextMenuStyles } from '../../utils/styles';
import { useMessageContextMenu } from '../../context/message-menu-context';
import { deleteMessageThunk } from '../../store/slices/messages-slice';
import { AppDispatch } from '../../store';
import { useAuthContext } from '../../context/auth-context';

type Props = {
  points: { x: number; y: number };
};
export default function SelectedMessageContextMenu({ points }: Props) {
  const { message } = useMessageContextMenu();
  const { id } = useParams();
  const { user } = useAuthContext();

  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteMessage = async () => {
    if (!message || !id) return;
    const conversationId = Number(id!);
    console.log(`Deleting Message ${message?.id}`);
    dispatch(deleteMessageThunk({ conversationId, messageId: message.id }));
  };
  return (
    <ContextMenuStyles top={points.y} left={points.x}>
      <ul>
        {message?.author.id === user?.id && <li onClick={handleDeleteMessage}>Delete</li>}
        {message?.author.id === user?.id && <li>Edit</li>}
      </ul>
    </ContextMenuStyles>
  );
}
