import classnames from 'classnames';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Layout from '../components/Layout/Layout';
import { useAuthContext } from '../firebase/FirebaseAuthContext';
import useFirebaseAuth from '../firebase/useFirebaseAuth';
import useForm from '../hooks/useForm';

type Props = {};

const schema = yup.object().shape({
  displayName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
  passwordVerify: yup
    .string()
    .required()
    .oneOf([yup.ref('password')])
});

const Signup = (props: Props) => {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const { createUserWithEmail } = useFirebaseAuth();
  const { values, handleChange, isValid } = useForm(
    {
      displayName: '',
      email: '',
      password: '',
      passwordVerify: ''
    },
    schema
  );

  useEffect(() => {
    if (authContext.isSignedIn) {
      navigate('/');
    }
  }, [authContext.isSignedIn, navigate]);

  const handleSignUp = () => {
    createUserWithEmail(values.email, values.password).then(userCred => {
      if (userCred) {
        userCred.user?.updateProfile({
          displayName: values.displayName
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
            <input name="displayName" type="text" onChange={handleChange} className="input w-full mb-1" />
            <label htmlFor="email">Email</label>
            <input name="email" type="email" onChange={handleChange} className="input w-full mb-1" />
            <label htmlFor="password">Password</label>
            <input name="password" type="password" onChange={handleChange} className="input w-full mb-1" />
            <label htmlFor="password">Verify Password</label>
            <input name="passwordVerify" type="password" onChange={handleChange} className="input w-full mb-1" />

            <button
              type="submit"
              className={classnames('btn text-white w-full my-2', {
                'bg-green-600': isValid,
                'hover:bg-green-700': isValid,
                'bg-gray-500': !isValid
              })}
              disabled={!isValid}
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
