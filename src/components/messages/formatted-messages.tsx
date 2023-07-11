import {formatRelative} from "date-fns";
import React, {Dispatch, SetStateAction} from "react";
import {
  EditMessageInputField,
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader
} from "../../utils/styles";
import EditMessageContainer from "./edit-message-container";

type FormattedMessageProps = {
  // eslint-disable-next-line react/require-default-props
  user?: User;
  message: Message;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isEditing: boolean;
  selectedMessageEdit: Message | null;
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function FormattedMessage({ user, message, onContextMenu, isEditing, selectedMessageEdit, onEditMessageChange }: FormattedMessageProps) {
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
        {/* <MessageItemContent>{message.content}</MessageItemContent> */}
        {
          isEditing && message.id === selectedMessageEdit?.id
            ? (
              <MessageItemContent padding="0 0 0 2px">
                <EditMessageContainer selectedMessageEdit={selectedMessageEdit} onEditMessageChange={onEditMessageChange} />
              </MessageItemContent>
            )
            : <MessageItemContent padding="0 0 0 2px">{message.content}</MessageItemContent>
        }
      </MessageItemDetails>
    </MessageItemContainer>
  );
}