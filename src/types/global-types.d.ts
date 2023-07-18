type ConversationType = {
  id: number;
  name: string;
  lastMessage: string;
};

type CreateUserParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

type UserCredentialsParams = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: string;
  lastMessageSent: Message;
};

type Message = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
  conversation: Conversation;
};

type FetchMessagePayload = {
  id: number;
  messages: Message[];
};

type MessageEventPayload = {
  message: Message;
  conversation: Conversation;
};

type CreateMessageParams = {
  content: string;
};

type CreateConversationParams = {
  email: string;
  message: string;
};

type DeleteMessageParams = {
  conversationId: number;
  messageId: number;
};

type DeleteMessageResponse = {
  conversationId: number;
  messageId: number;
};

type EditMessagePayload = {
  conversationId: number;
  messageId: number;
  content: string;
};

type ConversationSelectedType = 'private' | 'group';

type ConversationTypeData = {
  type: ConversationSelectedType;
  label: string;
};

type Group = {
  id: number;
  title?: string;
  users: User[];
  creator: User;
  messages: Message[];
  createdAt: number;
  lastMessageSent: Message;
  lastMessageSentAt: Date;
};
