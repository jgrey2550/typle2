import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { UserProvider } from './contexts/userContext';

//wrapping whole app in userProvider (user context) so the whole app has access to update and read userID

ReactDOM.render(
  <div>
    <UserProvider>
      <App />
    </UserProvider>
  </div>,
  document.getElementById("root")
);