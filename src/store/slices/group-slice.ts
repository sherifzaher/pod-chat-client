import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createGroupAPI,
  fetchGroups as FetchGroupsAPI,
  postNewConversation
} from '../../utils/api';

export interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: []
};

export const fetchGroupThunk = createAsyncThunk('group/fetch', () => FetchGroupsAPI());

export const createGroupThunk = createAsyncThunk('group/create', (data: string[]) =>
  createGroupAPI(data)
);

export const GroupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      console.log(`addGroup reducer: Adding ${action.payload.id} to statesc`);
      state.groups.unshift(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroupThunk.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.groups = action.payload.data;
    });
  }
});

export const { addGroup } = GroupSlice.actions;
export default GroupSlice.reducer;
