import { formatRelative } from 'date-fns';
import { useEffect } from 'react';
import {
  MessageContainerStyle,
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader
} from "../../utils/styles";
import {useAuthContext} from "../../context/auth-context";

type Props = {
  messages: Message[];
};

type FormattedMessageProps = {
  // eslint-disable-next-line react/require-default-props
  user?: User;
  message: Message;
};
export function FormattedMessage({ user, message }: FormattedMessageProps) {
  return (
    <MessageItemContainer>
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

export default function MessageContainer({ messages }: Props) {
  const { user } = useAuthContext();

  const formatMessages = () =>
    messages.map((message, index, arr) => {
      const nextIndex = index + 1;
      const currentMessage = arr[index];
      const nextMessage = arr[nextIndex];
      if (arr.length === nextIndex) {
        return <FormattedMessage key={message.id} user={user} message={message} />;
      }
      if (currentMessage.author.id === nextMessage.author.id) {
        return (
          <MessageItemContainer key={message.id}>
            <MessageItemContent padding="0 0 0 70px">{message.content}</MessageItemContent>
          </MessageItemContainer>
        );
      }
      return <FormattedMessage key={message.id} user={user} message={message} />;
    });

  useEffect(() => {
    formatMessages();
  }, []);
  return (
    <MessageContainerStyle>
      {formatMessages()}
      {/* {messages.map((message) => ( */}
      {/*  <MessageItemContainer> */}
      {/*    <MessageItemAvatar /> */}
      {/*    <MessageItemDetails> */}
      {/*      <MessageItemHeader> */}
      {/*        <span */}
      {/*          className="authorName" */}
      {/*          style={{ */}
      {/*            color: user?.id === message.author.id ? '#757575' : '#5E8BFF' */}
      {/*          }} */}
      {/*        > */}
      {/*          {message.author.firstName} {" "} {message.author.lastName} */}
      {/*        </span> */}
      {/*        <span className="time">{formatRelative(new Date(message.createdAt), new Date())}</span> */}
      {/*      </MessageItemHeader> */}
      {/*      <MessageItemContent> */}
      {/*        {message.content} */}
      {/*      </MessageItemContent> */}
      {/*    </MessageItemDetails> */}
      {/*  </MessageItemContainer> */}
      {/* ))} */}
    </MessageContainerStyle>
  );
}
