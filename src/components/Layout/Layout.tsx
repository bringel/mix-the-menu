import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../firebase/FirebaseAuthContext';

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { isSignedIn } = useAuthContext();
  return (
    <div className="py-2 px-8 min-h-screen bg-gray-200">
      <nav className="flex justify-between mb-2">
        <Link to="/">
          <h1 className="text-3xl font-header font-black">Mix the Menu</h1>
        </Link>
        {isSignedIn && (
          <ul className="flex justify-end items-center">
            <li className="ml-2">
              <Link to="user/settings" className="text-primary-500">
                Settings
              </Link>
            </li>
            <li className="ml-2">Logout</li>
          </ul>
        )}
      </nav>

      <div className="container mx-auto">{props.children}</div>
    </div>
  );
};

export default Layout;
