import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreateMealPlan from './Create/CreateMealPlan';
import Dashboard from './Dashboard/Dashboard';
import { useAuthContext } from './firebase/FirebaseAuthContext';
import Login from './Login/Login';
import Settings from './Settings/Settings';
import Signup from './Signup/Signup';

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/user/settings/*" element={<Settings />} />
      <Route path="/create" element={<CreateMealPlan />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function UnauthenticatedApp() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  const auth = useAuthContext();
  return auth.initialized ? auth.isSignedIn ? <AuthenticatedApp /> : <UnauthenticatedApp /> : <div></div>;
}

export default App;
