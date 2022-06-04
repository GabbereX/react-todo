import { combineReducers, configureStore } from '@reduxjs/toolkit';
import getData from './reducers/getData';
import postData from './reducers/postData';
import addTaskFields from './reducers/forms/addTaskFields';
import params from './reducers/params';

const rootReducer = combineReducers({
  getData,
  postData,
  addTaskFields,
  params,
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
