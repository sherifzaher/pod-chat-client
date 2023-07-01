import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { getConversationMessages } from '../../utils/api';

export interface MessagesState {
  messages: FetchMessagePayload[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false
};

export const fetchMessagesThunk = createAsyncThunk('messages/fetch', (id: number) =>
  getConversationMessages(id)
);

export const MessagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action:PayloadAction<MessageEventPayload>) => {
      const { conversation, ...message } = action.payload;
      const conversationItem = state.messages.find((conv) => conv.id === conversation.id);
      conversationItem?.messages.unshift(message);
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id, messages } = action.payload.data;
        const index = state.messages.findIndex((msg) => msg.id === id);
        const exists = state.messages.at(index);

        if (exists) {
          state.messages[index] = action.payload.data;
        } else {
          state.messages.push(action.payload.data);
        }
        state.loading = false;
      })
      .addCase(fetchMessagesThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.rejected, (state, action) => {
        state.loading = false;
      });
  }
});

export const { addMessage } = MessagesSlice.actions;
export default MessagesSlice.reducer;
