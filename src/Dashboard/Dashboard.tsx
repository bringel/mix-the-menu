import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useAuthContext } from '../firebase/FirebaseAuthContext';

type Props = {};

const Dashboard = (props: Props) => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  if (!auth.user && auth.initialized) {
    navigate('/login');
  }

  if (auth.initialized) {
    return <Layout>HI</Layout>;
  } else {
    //TODO: show a loader
    return null;
  }
};

export default Dashboard;
