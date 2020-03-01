import React from 'react';

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="relative">
      <div className="bg-white rounded-sm m-3  md:w-1/2 lg:w-1/4 shadow-md border md:absolute md:top-0 md:right-0 md:mt-4 md:mr-4 px-4 py-6">
        <button className="bg-green-600 py-2 px-4 rounded-md text-white w-full text-lg">Log In</button>
        <div className="text-xl flex justify-center my-1">&mdash; or &mdash;</div>
        <button className="bg-green-600 py-2 px-4 rounded-md text-white w-full text-lg">Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
