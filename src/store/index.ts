import {configureStore} from "@reduxjs/toolkit";
import ConversationReducer from './slices/conversation-slice';

export const store = configureStore({
  reducer: {
    conversations: ConversationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;