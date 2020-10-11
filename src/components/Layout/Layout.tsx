import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../../firebase/FirebaseAuthContext';

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { isSignedIn } = useAuthContext();
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between mb-2 py-2 px-8 bg-primary-500 text-lg text-grey-800">
        <div className="flex items-center">
          <h1 className="text-3xl font-header font-bold mr-6">Mix the Menu</h1>
          {isSignedIn && (
            <div className="mt-2">
              <NavLink to="/dashboard" className="mr-2 py-1 px-3" activeClassName="bg-primary-600 rounded">
                Dashboard
              </NavLink>
              <NavLink to="/history" className="mr-2 py-1 px-3" activeClassName="bg-primary-600 rounded">
                History
              </NavLink>
              <Link to="/create" className="bg-gray-800 text-white font-semibold rounded mr-2 py-2 px-4">
                Create Menu
              </Link>
            </div>
          )}
        </div>
        {isSignedIn && (
          <div className="flex items-center mt-2">
            <NavLink to="/user/settings" className="mr-2 py-1 px-3" activeClassName="bg-primary-600 rounded">
              Settings
            </NavLink>
            <Link to="/logout" className="mr-2 py-1 px-3">
              Logout
            </Link>
          </div>
        )}
      </nav>

      <div className="container mx-auto">{props.children}</div>
    </div>
  );
};

export default Layout;
