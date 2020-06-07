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
    return (
      <Layout>
        <div className="mx-4 grid grid-cols-4 row-gap-4">
          <div className="col-span-3">
            <h2 className="text-lg font-header">Current Meal Plan</h2>
          </div>
          <div className="col-span-1 border rounded py-2 px-4">
            <h2 className="text-lg font-header mb-2">Create</h2>
            <button className="btn bg-primary-500 hover:bg-primary-600 text-white">Quick Create</button>
          </div>
          <div className="col-span-3">
            <h2 className="text-lg font-header">History</h2>
          </div>
        </div>
      </Layout>
    );
  } else {
    //TODO: show a loader
    return null;
  }
};

export default Dashboard;
