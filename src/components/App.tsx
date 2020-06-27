import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../reducers';
import Routes from './Routes';

const App: React.SFC = function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
