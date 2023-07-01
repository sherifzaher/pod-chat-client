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
};

type Message = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
};

type MessageEventPayload = {
  id: number;
  createdAt: string;
  conversation: Conversation;
  author: User;
  content: string;
};

type CreateMessageParams = {
  content: string;
  conversationId: number;
}