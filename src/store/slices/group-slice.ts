import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchGroups as FetchGroupsAPI } from '../../utils/api';

export interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: [],
};

export const fetchGroupThunk = createAsyncThunk('group/fetch', () => FetchGroupsAPI());

export const GroupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGroupThunk.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.groups = action.payload.data;
    });
  },
});

// export const { } = GroupSlice.actions;
export default GroupSlice.reducer;
