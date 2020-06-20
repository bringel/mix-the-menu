import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

type Props = {};

const Dashboard = (props: Props) => {
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
};

export default Dashboard;
