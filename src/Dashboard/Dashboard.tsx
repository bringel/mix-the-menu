import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
          <div className="col-span-1 border rounded py-2 px-4 flex flex-col">
            <Link className="btn bg-primary-500 hover:bg-primary-600 text-white flex-grow text-center" to="/create">
              Create
            </Link>
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
