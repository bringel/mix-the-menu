import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import { AuthContextProvider } from './firebase/FirebaseAuthContext';
import Login from './Login/Login';
import Settings from './Settings/Settings';
import Signup from './Signup/Signup';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/settings" element={<Settings />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
