import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserSettingsContextProvider } from './contexts/UserSettingsContext';
import { AuthContextProvider } from './firebase/FirebaseAuthContext';

function Providers(props: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <UserSettingsContextProvider>{props.children}</UserSettingsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default Providers;
