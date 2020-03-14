import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className="py-2 px-4">
      <nav className="flex justify-between mb-2">
        <h1 className="text-2xl">Mix the Menu</h1>
        <ul className="flex justify-end items-center">
          <li className="ml-2">
            <Link to="user/settings" className="text-green-600">
              Settings
            </Link>
          </li>
          <li className="ml-2">Logout</li>
        </ul>
      </nav>
      {props.children}
    </div>
  );
};

export default Layout;
