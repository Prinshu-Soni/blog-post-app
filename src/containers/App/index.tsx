import React from 'react';
import { Provider } from 'react-redux';
import 'src/assets/styles/_main.scss';
import ErrorBoundary from 'src/components/ErrorBoundary';
import store from 'src/store';
import Layout from './Layout';

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <Layout />
    </ErrorBoundary>
  </Provider>
);

export default App;
