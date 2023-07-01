import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getConversationMessages, getConversations} from "../../utils/api";

interface ConversationState {
  conversations: Conversation[];
  messages: FetchMessagePayload[];
  loading: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  messages: [],
  loading: false,
}

export const fetchConversationsThunk = createAsyncThunk(
  'conversations/fetch',
  async () => getConversations(),
);

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  async (id: number) => getConversationMessages(id),
)

export const ConversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action:PayloadAction<Conversation>) => {
      console.log("Add Conversation");
      // state.conversations.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        console.log(state.conversations);
        state.loading = false;
      })
      .addCase(fetchConversationsThunk.pending, (state) => { state.loading = true })
      .addCase(fetchConversationsThunk.rejected, (state) => { state.loading = false })
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id, messages } = action.payload.data;
        const index = state.conversations.findIndex((conv) => conv.id === id);
        // const exists = state.conversations.find((conv) => conv.id === id);
        if(index >= -1){
          state.messages[index] = action.payload.data;
        } else {
          state.messages.push(action.payload.data)
        }
        state.loading = false;
      })
      .addCase(fetchMessagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.rejected, (state) => {
        state.loading = false;
      })
  }
});

export const { addConversation } = ConversationsSlice.actions;

export default ConversationsSlice.reducer;