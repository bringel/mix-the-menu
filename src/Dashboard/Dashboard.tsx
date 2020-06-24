import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useAuthContext } from '../firebase/FirebaseAuthContext';
import useFirestoreSimpleQuery from '../firebase/useFirestoreSimpleQuery';
import { collections } from '../firebaseCollections';
import { MealPlan } from '../types/MealPlan';

type Props = {};

const Dashboard = (props: Props) => {
  const authContext = useAuthContext();

  const [mealPlans, mealPlansLoading] = useFirestoreSimpleQuery<MealPlan>(
    collections.mealPlans,
    'userID',
    '==',
    authContext.user?.uid ?? ''
  );

  return (
    <Layout>
      <div className="mx-4 grid grid-cols-4 row-gap-4 col-gap-4">
        <div className="col-span-3">
          <h2 className="text-lg font-header">Current Meal Plan</h2>
          {mealPlansLoading ? (
            <div style={{ height: 250 }} className="pulse-loader" />
          ) : mealPlans?.length === 0 ? (
            <div style={{ height: 250 }} className="bg-gray-200 flex justify-center items-center text-gray-500">
              No current meal plan
            </div>
          ) : null}
        </div>
        <div className="col-span-1 border rounded py-2 px-4 flex flex-col">
          <Link className="btn bg-primary-500 hover:bg-primary-600 text-white text-center" to="/create">
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
