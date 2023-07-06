import { formatRelative } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  ContextMenuStyles,
  MessageContainerStyle,
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader
} from '../../utils/styles';
import { useAuthContext } from '../../context/auth-context';
import { RootState } from '../../store';
import { MessageMenuContext } from '../../context/message-menu-context';
import SelectedMessageContextMenu from '../context-menus/selected-message-context-menu';

type Props = {
  messages: Message[];
};

type FormattedMessageProps = {
  // eslint-disable-next-line react/require-default-props
  user?: User;
  message: Message;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
export function FormattedMessage({ user, message, onContextMenu }: FormattedMessageProps) {
  return (
    <MessageItemContainer onContextMenu={onContextMenu}>
      <MessageItemAvatar />
      <MessageItemDetails>
        <MessageItemHeader>
          <span
            className="authorName"
            style={{
              color: user?.id === message.author.id ? '#757575' : '#5E8BFF'
            }}
          >
            {message.author.firstName} {message.author.lastName}
          </span>
          <span className="time">{formatRelative(new Date(message.createdAt), new Date())}</span>
        </MessageItemHeader>
        <MessageItemContent>{message.content}</MessageItemContent>
      </MessageItemDetails>
    </MessageItemContainer>
  );
}

export default function MessageContainer() {
  const [showMenu, setShowMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const memoizedValues = useMemo(
    () => ({ message: selectedMessage, setMessage: setSelectedMessage }),
    [setSelectedMessage, selectedMessage]
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

  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, []);

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
            />
          );
        }
        if (currentMessage.author.id === nextMessage.author.id) {
          return (
            <MessageItemContainer onContextMenu={(e) => onContextMenu(e, message)} key={message.id}>
              <MessageItemContent padding="0 0 0 70px">{message.content}</MessageItemContent>
            </MessageItemContainer>
          );
        }
        return (
          <FormattedMessage
            onContextMenu={(e) => onContextMenu(e, message)}
            key={message.id}
            user={user}
            message={message}
          />
        );
      }),
    [messages]
  );

  return (
    <MessageMenuContext.Provider value={memoizedValues}>
      <MessageContainerStyle>
        {formatMessages()}
        {showMenu && <SelectedMessageContextMenu points={points} />}
      </MessageContainerStyle>
    </MessageMenuContext.Provider>
  );
}
