import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import CategorySettings from './CategorySettings';

type Props = {};

const Settings = (props: Props) => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h2 className="text-xl mb-2">User Settings</h2>

        <div className="grid grid-cols-4">
          <div className="col-start-1">
            <nav>
              <ul>
                <li className="mb-2">
                  <NavLink to="categories" className="px-3 py-2" activeClassName="text-white bg-green-600 rounded">
                    Categories
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink to="meal-plan" className="px-3 py-2" activeClassName="text-white bg-green-600 rounded">
                    Meal Plan
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-span-3">
            <Routes>
              <Route path="categories" element={<CategorySettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
