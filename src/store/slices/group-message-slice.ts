import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteGroupMessageAPI,
  fetchGroupMessages as fetchGroupMessagesAPI
} from '../../utils/api';
import { RootState } from '../index';
import { deleteMessageThunk } from './messages-slice';

export interface GroupMessagesState {
  messages: GroupMessage[];
}

const initialState: GroupMessagesState = {
  messages: []
};

export const fetchGroupMessagesThunk = createAsyncThunk('groupMessages/fetch', (id: number) =>
  fetchGroupMessagesAPI(id)
);

export const deleteGroupMessageThunk = createAsyncThunk(
  'groupMessages/delete',
  (params: DeleteGroupMessageParams) => deleteGroupMessageAPI(params)
);

export const GroupMessagesSlice = createSlice({
  name: 'groupMessages',
  initialState,
  reducers: {
    addGroupMessage: (state, action: PayloadAction<GroupMessageEventPayload>) => {
      const { group, message } = action.payload;
      const groupMessage = state.messages.find((gm) => gm.id === group.id);
      groupMessage?.messages.unshift(message);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupMessagesThunk.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        console.log('fetchGroupMessagesThunk.fulfilled');
        console.log(action.payload.data);
        const index = state.messages.findIndex((gm) => gm.id === id);
        const exists = state.messages.find((gm) => gm.id === id);
        exists
          ? (state.messages[index] = action.payload.data)
          : state.messages.push(action.payload.data);
      })
      .addCase(deleteGroupMessageThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        const groupMessages = state.messages.find((gm) => gm.id === data.groupId);

        const messageIndex = groupMessages?.messages.findIndex((m) => m.id === data.messageId)!;

        if (messageIndex > -1) {
          groupMessages?.messages.splice(messageIndex, 1);
        }
      });
  }
});

const selectGroupMessages = (state: RootState) => state.groupMessages.messages;
const selectGroupMessagesById = (state: RootState, id: number) => id;

export const selectGroupMessage = createSelector(
  [selectGroupMessages, selectGroupMessagesById],
  (groupMessages, id) => groupMessages.find((gm) => gm.id === id)
);

export const { addGroupMessage } = GroupMessagesSlice.actions;

export default GroupMessagesSlice.reducer;
