import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteMessage as deleteMessageApi, getConversationMessages, editMessage as editMessageAPI } from '../../utils/api';

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

export const deleteMessageThunk = createAsyncThunk(
  'messages/delete',
  (params: DeleteMessageParams) => deleteMessageApi(params)
);

export const editMessageThunk = createAsyncThunk(
  "messages/edit",
  (params: EditMessagePayload) => editMessageAPI(params)
)

export const MessagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
      const { conversation, message } = action.payload;
      const conversationItem = state.messages.find((conv) => conv.id === conversation.id);
      conversationItem?.messages.unshift(message);
    },
    deleteMessage: (state, action: PayloadAction<DeleteMessageResponse>) => {
      const { conversationId, messageId } = action.payload;
      const conversationMessages = state.messages.find((cm) => cm.id === conversationId);

      const messageIndex = conversationMessages?.messages.findIndex((m) => m.id === messageId)!;
      if (messageIndex > -1) {
        conversationMessages?.messages.splice(messageIndex, 1);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id, messages } = action.payload.data;
        const index = state.messages.findIndex((msg) => msg.id === id);
        if (index > -1) {
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
      })
      .addCase(deleteMessageThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        const conversationMessages = state.messages.find((cm) => cm.id === data.conversationId);

        const messageIndex = conversationMessages?.messages.findIndex(
          (m) => m.id === data.messageId
        )!;
        if (messageIndex > -1) {
          conversationMessages?.messages.splice(messageIndex, 1);
        }
      });
  }
});

export const { addMessage, deleteMessage } = MessagesSlice.actions;
export default MessagesSlice.reducer;
