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
      <nav className="flex justify-between mb-2 py-2 px-8 bg-primary-500 text-lg text-white">
        <div className="flex items-center">
          <h1 className="text-3xl font-header font-bold text-white mr-6">Mix the Menu</h1>
          {isSignedIn && (
            <div className="mt-2">
              <NavLink to="/dashboard" className="mr-2 py-1 px-3" activeClassName="bg-primary-600 rounded">
                Dashboard
              </NavLink>
              <NavLink to="/history" className="mr-2 py-1 px-3" activeClassName="bg-primary-600 rounded">
                History
              </NavLink>
            </div>
          )}
        </div>
        {isSignedIn && (
          <div className="flex items-center mt-2">
            <Link to="/create" className="bg-white text-primary-500 font-semibold rounded mr-2 py-2 px-4">
              Create
            </Link>
            <NavLink to="/user/settings" className="mr-2 py-1 px-3" activeClassName="bg-primary-600 rounded">
              Settings
            </NavLink>
            <div className="">Logout</div>
          </div>
        )}
      </nav>

      <div className="container mx-auto">{props.children}</div>
    </div>
  );
};

export default Layout;
