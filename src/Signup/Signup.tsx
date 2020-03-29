import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useAuthContext } from '../firebase/FirebaseAuthContext';
import useFirebaseAuth from '../firebase/useFirebaseAuth';

type Props = {};

const checkValid = (email: string, password: string, passwordVerify: string) => {
  const emailRegex = /\S*@\S*\.\S*/;

  const emailValid = emailRegex.test(email);
  const passwordsMatch = password === passwordVerify;

  return emailValid && passwordsMatch && email !== '' && password !== '' && passwordVerify !== '';
};

const Signup = (props: Props) => {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const { createUserWithEmail } = useFirebaseAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');

  useEffect(() => {
    if (authContext.isSignedIn) {
      navigate('/');
    }
  }, [authContext.isSignedIn, navigate]);

  const valid = checkValid(email, password, passwordVerify);

  const handleSignUp = () => {
    createUserWithEmail(email, password).then(userCred => {
      if (userCred) {
        userCred.user?.updateProfile({
          displayName: displayName
        });
      }
      navigate('/');
    });
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="bg-white rounded-sm m-3 px-4 py-6 border shadow-md flex-none w-full md:w-1/2 lg:w-1/4">
          <form onSubmit={e => e.preventDefault()}>
            <label htmlFor="displayName">Name</label>
            <input
              name="displayName"
              type="text"
              onChange={e => {
                setDisplayName(e.target.value);
              }}
              className="input w-full mb-1"
            />
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              onChange={e => {
                setEmail(e.target.value);
              }}
              className="input w-full mb-1"
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
              className="input w-full mb-1"
            />
            <label htmlFor="password">Verify Password</label>
            <input
              name="verifyPassword"
              type="password"
              onChange={e => {
                setPasswordVerify(e.target.value);
              }}
              className="input w-full mb-1"
            />

            <button
              type="submit"
              // className="btn bg-green-600 text-white w-full hover:bg-green-700 my-2"
              className={classnames('btn text-white w-full my-2', {
                'bg-green-600': valid,
                'hover:bg-green-700': valid,
                'bg-gray-500': !valid
              })}
              disabled={!valid}
              onClick={handleSignUp}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
