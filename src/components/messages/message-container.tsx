import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  MessageContainerStyle,
  MessageItemContainer,
  MessageItemContent,
} from '../../utils/styles';
import { useAuthContext } from '../../context/auth-context';
import { RootState } from '../../store';
import { MessageMenuContext } from '../../context/message-menu-context';
import SelectedMessageContextMenu from '../context-menus/selected-message-context-menu';
import FormattedMessage from "./formatted-messages";
import EditMessageContainer from "./edit-message-container";


export default function MessageContainer() {
  const [showMenu, setShowMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMessageEdit, setSelectedMessageEdit] = useState<Message | null>(null);
  const [originalEditMessage, setOriginalEditMessage] = useState(selectedMessageEdit);
  const memoizedValues = useMemo(
    () => ({ message: selectedMessage, setMessage: setSelectedMessage, selectedMessage, editMessage: selectedMessageEdit, setEditMessage: setSelectedMessageEdit }),
    [setSelectedMessage, selectedMessage, selectedMessageEdit, setSelectedMessageEdit]
  );
  const { user } = useAuthContext();
  const { id } = useParams();

  const messages =
    useSelector((state: RootState) => state.messages.messages).find(
      (conv) => conv.id.toString() === id!
    )?.messages || [];

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, message: Message) => {
    e.preventDefault();
    console.log('Hello from context menu');
    setPoints({ x: e.pageX, y: e.pageY });
    setShowMenu(true);
    setSelectedMessage(message);
  };

  const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!selectedMessageEdit) return;
    setSelectedMessageEdit((prev) => prev && {...prev, content: e.target.value});
    // if(selectedMessageEdit.content === originalEditMessage.content)
  }

  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, []);


  useEffect(() => {
    const handleKeyDown = (e:KeyboardEvent) => e.key === 'Escape' && setIsEditing(false);
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id])


  // reset everything when component un-mounted
  useEffect(() => {
    return () => {
      setSelectedMessage(null);
      setSelectedMessageEdit(null);
      setOriginalEditMessage(null);
      setIsEditing(false);
    }
  },[id]);

  const formatMessages = useCallback(
    () =>
      messages.map((message, index, arr) => {
        const nextIndex = index + 1;
        const currentMessage = arr[index];
        const nextMessage = arr[nextIndex];
        if (arr.length === nextIndex) {
          return (
            <FormattedMessage
              onContextMenu={(e) => onContextMenu(e, message)}
              key={message.id}
              user={user}
              message={message}
              isEditing={isEditing}
              selectedMessageEdit={selectedMessageEdit}
              onEditMessageChange={onEditMessageChange}
              setIsEditing={setIsEditing}
            />
          );
        }
        if (currentMessage.author.id === nextMessage.author.id) {
          return (
            <MessageItemContainer onContextMenu={(e) => onContextMenu(e, message)} key={message.id}>
              {
                isEditing && message.id === selectedMessageEdit?.id
                ? (
                    <MessageItemContent padding="0 0 0 70px">
                      <EditMessageContainer setIsEditing={setIsEditing} selectedMessageEdit={selectedMessageEdit} onEditMessageChange={onEditMessageChange} />
                    </MessageItemContent>
                  )
                : <MessageItemContent padding="0 0 0 70px">{message.content}</MessageItemContent>
              }
            </MessageItemContainer>
          );
        }
        return (
          <FormattedMessage
            onContextMenu={(e) => onContextMenu(e, message)}
            key={message.id}
            user={user}
            message={message}
            isEditing={isEditing}
            selectedMessageEdit={selectedMessageEdit}
            onEditMessageChange={onEditMessageChange}
            setIsEditing={setIsEditing}
          />
        );
      }),
    [messages, isEditing, selectedMessage, selectedMessageEdit]
  );

  return (
    <MessageMenuContext.Provider value={memoizedValues}>
      <MessageContainerStyle>
        {formatMessages()}
        {showMenu && <SelectedMessageContextMenu setIsEditing={setIsEditing} points={points} />}
      </MessageContainerStyle>
    </MessageMenuContext.Provider>
  );
}
