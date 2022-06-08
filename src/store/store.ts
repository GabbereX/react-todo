import { combineReducers, configureStore } from '@reduxjs/toolkit';
import getData from './reducers/api/getData';
import postData from './reducers/api/postData';
import addTaskFields from './reducers/forms/addTaskFields';
import params from './reducers/params';
import authorizationFields from './reducers/forms/authorizationFields';
import getToken from './reducers/api/getToken';
import editData from "./reducers/api/editData";

const rootReducer = combineReducers({
  getData,
  postData,
  getToken,
  editData,
  params,
  addTaskFields,
  authorizationFields,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const store = setupStore();
