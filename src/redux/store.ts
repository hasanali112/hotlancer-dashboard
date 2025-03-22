import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./features/layoutSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "layout",
  storage,
};
const layoutPersistedReducer = persistReducer(persistConfig, layoutReducer);

export const store = configureStore({
  reducer: {
    layout: layoutPersistedReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
