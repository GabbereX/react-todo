import { combineReducers, configureStore } from '@reduxjs/toolkit';
import getData from './reducers/getData';

const rootReducer = combineReducers({
  getData,
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
