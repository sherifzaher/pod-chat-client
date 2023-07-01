import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ConversationState {
  conversations: Conversation[];
}

const initialState: ConversationState = {
  conversations: [],
}

export const ConversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action:PayloadAction<Conversation>) => {
      console.log("Add Conversation");
      state.conversations.push(action.payload);
    }
  }
});

export const { addConversation } = ConversationsSlice.actions;

export default ConversationsSlice.reducer;