import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getConversations} from "../../utils/api";

interface ConversationState {
  conversations: Map<number, Conversation>;
}

const initialState: ConversationState = {
  conversations: new Map(),
}

export const fetchConversationsThunk = createAsyncThunk(
  'conversations/fetch',
  async () => getConversations(),
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
    builder.addCase(fetchConversationsThunk.fulfilled, (state, action) => {
      action.payload.data.forEach((conversation) => state.conversations.set(conversation.id, conversation));
    })
  }
});

export const { addConversation } = ConversationsSlice.actions;

export default ConversationsSlice.reducer;