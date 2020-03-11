import Login from './Login/Login';
import React from 'react';
import { AuthContextProvider } from './firebase/FirebaseAuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
