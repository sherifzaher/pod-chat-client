import axios, { AxiosRequestConfig } from 'axios';

const { REACT_APP_API_URL } = process.env;

const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = async (data: CreateUserParams) =>
  axios.post(`${REACT_APP_API_URL}/auth/register`, data, config);

export const postLoginUser = async (data: UserCredentialsParams) =>
  axios.post(`${REACT_APP_API_URL}/auth/login`, data, config);

export const getAuthUser = async () => axios.get(`${REACT_APP_API_URL}/auth/status`, config);

export const getConversations = () =>
  axios.get<Conversation[]>(`${REACT_APP_API_URL}/conversations`, config);

export const getConversationMessages = (conversationId: number) =>
  axios.get<FetchMessagePayload>(`${REACT_APP_API_URL}/conversations/${conversationId}/messages`);

export const postNewMessage = (conversationId: number, content: CreateMessageParams) =>
  axios.post(`${REACT_APP_API_URL}/conversations/${conversationId}/messages`, content, config);

export const postNewConversation = (data: CreateConversationParams) =>
  axios.post<Conversation>(`${REACT_APP_API_URL}/conversations`, data, config);

export const deleteMessage = ({ conversationId, messageId }: DeleteMessageParams) =>
  axios.delete<DeleteMessageResponse>(
    `${REACT_APP_API_URL}/conversations/${conversationId}/messages/${messageId}`,
    config
  );
