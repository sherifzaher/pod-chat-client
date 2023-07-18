import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGroupMessages as fetchGroupMessagesAPI } from '../../utils/api';

export interface GroupMessagesState {
  messages: GroupMessage[];
}

const initialState: GroupMessagesState = {
  messages: [],
};

export const fetchGroupMessagesThunk = createAsyncThunk(
  'groupMessages/fetch',
  (id: number) => fetchGroupMessagesAPI(id)
);

export const GroupMessagesSlice = createSlice({
  name: 'groupMessages',
  initialState,
  reducers: {
    addGroupMessage: (
      state,
      action: PayloadAction<GroupMessageEventPayload>
    ) => {
      const { group, message } = action.payload;
      const groupMessage = state.messages.find((gm) => gm.id === group.id);
      groupMessage?.messages.unshift(message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroupMessagesThunk.fulfilled, (state, action) => {
      const { id } = action.payload.data;
      console.log('fetchGroupMessagesThunk.fulfilled');
      console.log(action.payload.data);
      const index = state.messages.findIndex((gm) => gm.id === id);
      const exists = state.messages.find((gm) => gm.id === id);
      exists
        ? (state.messages[index] = action.payload.data)
        : state.messages.push(action.payload.data);
    });
  },
});

export const { addGroupMessage } = GroupMessagesSlice.actions;

export default GroupMessagesSlice.reducer;
