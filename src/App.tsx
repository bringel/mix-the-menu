import Login from './Login/Login';
import React from 'react';
import Signup from './Signup/Signup';
import { AuthContextProvider } from './firebase/FirebaseAuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
