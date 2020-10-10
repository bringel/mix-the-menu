import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuthContext } from '../firebase/FirebaseAuthContext';
import useFirestoreComplexQuery from '../firebase/useFirestoreComplexQuery';
import { collections } from '../firebaseCollections';
import { Menu } from '../types/Menu';

type Props = {};

const Dashboard = (props: Props) => {
  const authContext = useAuthContext();
  const [menus, menusLoading] = useFirestoreComplexQuery<Menu>(collections.menus, collection =>
    collection.where('userID', '==', authContext.user?.uid ?? '').orderBy('startDate', 'desc')
  );

  return (
    <Layout>
      <div className="mx-4 grid grid-cols-4 row-gap-4 col-gap-4">
        <h2 className="text-lg font-header col-start-1 col-span-3">Current Menu</h2>
        <div className="col-start-1 col-span-3">
          {menusLoading ? (
            <div style={{ height: 250 }} className="pulse-loader" />
          ) : menus?.length === 0 ? (
            <div style={{ height: 250 }} className="bg-gray-200 flex justify-center items-center text-gray-500">
              No current menu
            </div>
          ) : null}
        </div>
        <h2 className="col-start-1 col-span-3 text-lg font-header">History</h2>
        <div className="col-start-1 col-span-3"></div>
      </div>
    </Layout>
  );
};

export default Dashboard;
