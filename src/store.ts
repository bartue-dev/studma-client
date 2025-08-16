import { configureStore, combineReducers, type UnknownAction } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/api";
import authReducer from "./features/Auth/authSlice";
import studentReducer from "./features/Student/StudentSlice";


const rootReducers = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    student: studentReducer
  })

export type RootState = ReturnType<typeof rootReducers>;

const appReducers = (
  state: RootState | undefined,
  action: UnknownAction
) : RootState => {
  if (action.type === "auth/logOut") {
    state = undefined;
  }

  return rootReducers(state, action);
}


export const store = configureStore({
  reducer: appReducers,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true // set to false in production
}); 

export type AppDispatch = typeof store.dispatch;