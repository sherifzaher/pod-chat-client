import styled, { css } from 'styled-components';
import {
  ContextMenuProps,
  ConversationSelectedProps,
  InputContainerProps,
  MessageItemContentProps,
  MessageTypingStatusProps,
  PageProps,
  SidebarItemProps
} from '../../types/style-types';

export const SIDEBAR_WIDTH = 400;

export const InputField = styled.input`
  border-sizing: border-box;
  font-family: 'Inter';
  outline: none;
  border: none;
  color: white;
  font-size: 18px;
  background-color: inherit;
  margin: 4px 0;
  width: 100%;
`;

export const InputContainer = styled.div<InputContainerProps>`
  background-color: ${(props) => props.backgroundColor || '#131313'};
  color: white;
  padding: 12px 16px;
  border-radius: 10px;
  width: 100%;
`;

export const RecipientChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 5px;
  gap: 4px 10px;
`;

export const InputLabel = styled.label`
  display: block;
  color: #8f8f8f;
  font-size: 14px;
  margin: 4px 0;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #2b09ff;
  color: white;
  outline: none;
  font-size: 16px;
  border-radius: 10px;
  padding: 25px;
  font-weight: 500;
  transition: 250ms border-color ease-in, 300ms border-color ease-in;
  border: 2px solid #2b09ff;

  &:focus {
    background-color: #4f34ff;
    border-color: #fff;
  }

  &:hover {
    cursor: pointer;
    background-color: #3415ff;
  }

  &:disabled {
    background-color: #4d4d4d;
    border-color: transparent;
    cursor: not-allowed;
  }
`;

export const Page = styled.div<PageProps>`
  height: 100%;
  background-color: #1a1a1a;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

export const ConversationChannelPageStyle = styled.div`
  height: 100%;
  width: 100%;
`;

export const ConversationSidebarContainer = styled.div``;

export const ConversationSidebarItemStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 32px;
  width: 100%;
`;

export const OverlayStyle = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: #000000c4;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContainerStyle = styled.header`
  position: relative;
  background-color: #121212;
  width: 650px;
  border-radius: 10px;
`;

export const ModalHeaderStyle = styled.header`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  & h2 {
    font-weight: 400;
  }
`;

export const ModalContentBodyStyle = styled.div`
  padding: 20px;
`;

export const TextField = styled.textarea`
  border-sizing: border-box;
  font-family: 'Inter';
  width: 100%;
  outline: none;
  border: none;
  color: white;
  font-size: 18px;
  background-color: inherit;
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MessagePanelStyle = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #5454543d;
`;

export const MessagePanelBody = styled.div`
  min-height: 0;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 0 24px 0;
`;

export const MessageContainerStyle = styled.div`
  height: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  & ::-webkit-scrollbar {
    display: none;
  }
`;

export const MessageInputContainer = styled.div`
  border-radius: 10px;
  background-color: #101010;
  width: 100%;
  padding: 18px 32px;

  & form {
    width: 100%;
  }
`;

export const MessagePanelFooter = styled.footer`
  padding: 0 32px 10px 32px;
`;

export const MessageInput = styled.input`
  background-color: inherit;
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  margin: 4px 0;
  color: #454545;
  font-family: 'Inter', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 18px;
`;

export const MessageItemContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 5px 0;
  word-break: break-all;
`;

export const MessageItemAvatar = styled.div`
  width: 50px;
  height: 50px;
  background-color: #b12b2b;
  border-radius: 50%;
`;

export const MessageItemDetails = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

export const MessageItemHeader = styled.div`
  display: flex;
  gap: 12px;
  .time {
    color: #6d6d6d;
    font-size: 12px;
    font-weight: bold;
  }
  .authorName {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const MessageItemContent = styled.div<MessageItemContentProps>`
  padding: ${(props) => props.padding};
  width: 100%;
`;

export const MessagePanelHeaderStyle = styled.header`
  background-color: #141414;
  border-bottom: 1px solid #22222256;
  box-shadow: 5px 0 5px 1px #000;
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  flex-shrink: 0;
`;

export const ContextMenuStyles = styled.div<ContextMenuProps>`
  border-radius: 8px;
  position: fixed;
  width: 200px;
  background-color: #252525;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 10px;
  }

  ul li {
    padding: 14px 16px;
    border-radius: 8px;
  }

  ul li:hover {
    cursor: pointer;
    background-color: #1f1f1f;
  }
`;

export const MessageTypingStatus = styled.div<MessageTypingStatusProps>`
  width: 100%;
  margin: 10px 0 10px 0;
  font-size: 14px;
  color: #a2a2a2;
  transition: all 0.5s ease-in-out;
  visibility: ${(props) => (props.isRecipientTyping ? 'visible' : 'hidden')};
`;

export const EditMessageInputField = styled.input`
  outline: none;
  border: none;
  background-color: #222;
  color: #fff;
  border-radius: 5px;
  font-family: 'Inter';
  font-size: 15px;
  padding: 18px 22px;
  margin: 4px 0;
  width: 100%;

  &:disabled {
    background-color: #2d2d2d;
    color: gray;
    cursor: progress;
  }
`;

export const EditMessageActionsContainer = styled.div`
  font-size: 12px;
  & span {
    color: dodgerblue;
  }
`;

export const ConversationSelectedStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  background-color: #141414;
  border-bottom: 1px solid #0f0f0f;
  padding: 20px 32px;
`;

export const ConversationSelectedItem = styled.div<ConversationSelectedProps>`
  padding: 10px 24px;
  border-radius: 10px;
  background-color: #212121;
  font-size: 14px;
  color: #f0f0f0;
  ${(props) =>
    props.selected &&
    css`
      background-color: #444444;
    `}
`;

export const UserAvatar = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 55px;
  margin: 10px 0;
`;

export const UserSidebarTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  margin: 20px 0;
`;

export const UserSidebarTopIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18px;
  gap: 40px;
`;

export const UserSidebarBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ConversationSidebarStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  margin-left: 90px;
  width: ${SIDEBAR_WIDTH}px;
  background-color: #111111;
  border-right: 1px solid #5454543d;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
    /* width: 10px;
    height: 5px; */
  }
`;
export const ConversationSidebarHeaderStyle = styled.header`
  padding: 24px 32px;
  box-sizing: border-box;
  position: fixed;
  width: ${SIDEBAR_WIDTH}px;
  top: 0;
  left: 90px;
  z-index: 9;
  background-color: inherit;
`;

export const ConversationTabStyle = styled.section`
  display: flex;
  gap: 20px;
  margin: 14px 18px;
`;

export const ConversationTabItemStyle = styled.section<ConversationSelectedProps>`
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ selected }) => (!selected ? '#1f1f1f' : '#383838')};
  padding: 8px 18px;
  border-radius: 5px;
  text-transform: uppercase;
`;

export const SidebarContainerStyle = styled.div``;

export const SidebarContainerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px 32px;
  margin: 18px 0;
`;

export const SidebarContainerItemContent = styled.div`
  & .name {
    display: block;
    font-size: 18px;
    font-weight: 600;
  }

  & .lastMessage {
    display: block;
    font-size: 16px;
    color: #797979;
    font-weight: 500;
  }
`;

export const RecipientResultContainerStyle = styled.div`
  position: absolute;
  background-color: #161616;
  left: 0;
  right: 0;
  margin: 4px 24px;
`;

export const RecipientScrollableItemContainer = styled.div`
  max-height: 190px;
  overflow: scroll;
  &&::-webkit-scrollbar {
    display: none;
  }
`;

export const RecipientBottomSection = styled.div`
  border-top: 1px solid #fff;
  margin: 4px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const RecipientResultItem = styled.div`
  padding: 20px 28px;
  transition: 200ms background-color ease;
  &:hover {
    cursor: pointer;
    background-color: #0c0c0c;
  }
`;

export const SelectedRecipientPillStyle = styled.div`
  border: 1px solid #323232b0;
  font-size: 14px;
  width: fit-content;
  border-radius: 50px;
  padding: 6px 18px;
  & .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }

  & .icon {
    margin-left: 10px;
    cursor: pointer;
    transition: 300ms color ease;
    :hover {
      color: #c62d2d;
    }
  }
`;

export const LayoutPage = styled.div`
  height: 100%;
  display: flex;
`;

export const UserSidebarStyle = styled.div`
  height: 100%;
  background-color: #111111;
  display: flex;
  flex: 0 0 80px;
  align-items: center;
  flex-direction: column;
`;

export const ConversationSidebarStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 400px;
  background-color: #111;
`;

export const ConversationSidebarHeader = styled.div`
  padding: 10px 30px;
  height: 90px;
  flex-shrink: 0;
  border-bottom: 1px solid #22222256;
  box-shadow: 5px 0 5px 1px #000;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ConversationScrollableContainer = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ConversationSearchbar = styled.input`
  background-color: #1c1c1c;
  color: #e1e1e1;
  width: 100%;
  padding: 10px 16px;
  border: none;
  outline: none;
  font-size: 15px;
  font-family: 'Inter', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  border-radius: 5px;
`;

export const UserSidebarItem = styled.div<SidebarItemProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background-color: ${({ active }) => active && '#1e1e1e'};
`;
