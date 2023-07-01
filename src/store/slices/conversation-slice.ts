import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getConversationMessages, getConversations} from "../../utils/api";

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
}

export const fetchConversationsThunk = createAsyncThunk(
  'conversations/fetch',
  async () => getConversations(),
);

export const ConversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action:PayloadAction<Conversation>) => {
      console.log("Add Conversation");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchConversationsThunk.pending, (state) => { state.loading = true })
      .addCase(fetchConversationsThunk.rejected, (state) => { state.loading = false })
  }
});

export const { addConversation } = ConversationsSlice.actions;

export default ConversationsSlice.reducer;