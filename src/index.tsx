
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import Routes from './routes'

const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <Routes />
  </QueryClientProvider>,
  document.getElementById('root')
);