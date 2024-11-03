import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';

import "./index.css"
import App from './app';
import { StateProvider } from './context';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);

  root.render(
    <ThirdwebProvider activeChain={11155111}> 
      <Router>
        <StateProvider>
          <App />
        </StateProvider>
      </Router>
    </ThirdwebProvider> 
  );
}
