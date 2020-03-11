import facebook from '../images/facebook_white.svg';
import google from '../images/google_white.svg';
import microsoft from '../images/microsoft_white.svg';
import React from 'react';


type Props = {};

const Login = (props: Props) => {
  return (
    <div className="flex justify-center p-2">
      <div className="bg-white rounded-sm m-3 px-4 py-6 border shadow-md flex-none w-full md:w-1/2 lg:w-1/4 ">
        <label htmlFor="email">Email</label>
        <input name="email" className="input w-full mb-1" />
        <label htmlFor="password">Password</label>
        <input name="password" type="password" className="input w-full mb-1" />
        <button className="btn bg-green-600 text-white w-full hover:bg-green-700 my-2">Log In</button>
        <div>
          Don't have an account?&nbsp;
          <a href="/signup" className="text-green-600 underline">
            Sign Up
          </a>
        </div>
        <button className="btn mt-2 bg-facebook hover:bg-facebook-darker text-white w-full flex align-center px-10">
          <img src={facebook} width={24} height={24} className="mr-4" alt="facebook logo" />
          Sign in with Facebook
        </button>
        <button className="btn mt-2 bg-google hover:bg-google-darker text-white w-full flex align-center px-10">
          <img src={google} width={24} height={24} className="mr-4" alt="google logo" />
          Sign in with Google
        </button>
        <button className="btn mt-2 bg-microsoft hover:bg-microsoft-darker text-white w-full flex align-center px-10">
          <img src={microsoft} width={24} height={24} className="mr-4" alt="microsoft logo" />
          Sign in with Microsoft
        </button>
      </div>
    </div>
  );
};

export default Login;
