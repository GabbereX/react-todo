import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/main.local.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header />
      <Main />
      <Footer />
    </Provider>
  </React.StrictMode>
);
