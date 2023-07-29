import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGroupThunk.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.groups = action.payload.data;
    });
  }
});

// export const { } = GroupSlice.actions;
export default GroupSlice.reducer;
