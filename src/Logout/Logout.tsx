import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Layout from '../components/Layout/Layout';
import firebase from '../firebase';

type Props = {};

const Logout = (props: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = firebase.auth();

    auth.signOut().then(() => {
      navigate('/');
    });
  }, [navigate]);

  return (
    <Layout>
      <div />
    </Layout>
  );
};

export default Logout;
