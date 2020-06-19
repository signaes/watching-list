import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';
import './styles/styles.scss';

const root = document.getElementById('root');

ReactDom.render(<App />, root);

if (module.hot) {
  module.hot.accept('./components/App.tsx', () => {
    ReactDom.render(<App />, root);
  });
}
