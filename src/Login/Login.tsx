import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import Layout from '../components/Layout/Layout';
import useFirebaseAuth from '../firebase/useFirebaseAuth';
import facebook from '../images/facebook_white.svg';
import google from '../images/google_white.svg';
import microsoft from '../images/microsoft_white.svg';


type Props = {};

const Login = (props: Props) => {
  const { signInWithGoogle, signInWithFacebook, signInWithMicrosoft, signInWithEmail } = useFirebaseAuth();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required()
  });

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="bg-white rounded-sm m-3 px-4 py-6 border shadow-md flex-none w-full md:w-1/2 lg:w-1/4 ">
          <Formik
            onSubmit={values => {
              return signInWithEmail(values.email, values.password);
            }}
            validationSchema={schema}
            initialValues={{ email: '', password: '' }}
            isInitialValid={false}>
            {formikProps => (
              <Form>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <Field name="email" className="input w-full mb-1" />
                <label htmlFor="password" className="label">
                  Password
                </label>
                <Field name="password" type="password" className="input w-full mb-1" />
                <button
                  type="submit"
                  className="btn bg-primary-500 text-white text-lg w-full hover:bg-green-700 my-2"
                  disabled={!formikProps.isValid || formikProps.isSubmitting}>
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <div>
            Don't have an account?&nbsp;
            <Link to="/signup" className="text-primary-500 underline">
              Sign Up
            </Link>
          </div>
          <button
            onClick={() => signInWithFacebook()}
            className="btn mt-2 bg-facebook hover:bg-facebook-darker text-white text-lg w-full flex align-center px-10">
            <img src={facebook} width={24} height={24} className="mr-4" alt="facebook logo" />
            Sign in with Facebook
          </button>
          <button
            onClick={() => signInWithGoogle()}
            className="btn mt-2 bg-google hover:bg-google-darker text-white text-lg w-full flex align-center px-10">
            <img src={google} width={24} height={24} className="mr-4" alt="google logo" />
            Sign in with Google
          </button>
          <button
            onClick={() => signInWithMicrosoft()}
            className="btn mt-2 bg-microsoft hover:bg-microsoft-darker text-white text-lg w-full flex align-center px-10">
            <img src={microsoft} width={24} height={24} className="mr-4" alt="microsoft logo" />
            Sign in with Microsoft
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
