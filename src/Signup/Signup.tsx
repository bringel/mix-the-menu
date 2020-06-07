import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Layout from '../components/Layout/Layout';
import { useAuthContext } from '../firebase/FirebaseAuthContext';
import useFirebaseAuth from '../firebase/useFirebaseAuth';

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

  useEffect(() => {
    if (authContext.isSignedIn) {
      navigate('/');
    }
  }, [authContext.isSignedIn, navigate]);

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="bg-white rounded-sm m-3 px-4 py-6 border shadow-md flex-none w-full md:w-1/2 lg:w-1/4">
          <Formik
            initialValues={{
              displayName: '',
              email: '',
              password: '',
              passwordVerify: ''
            }}
            validationSchema={schema}
            onSubmit={values => {
              return createUserWithEmail(values.email, values.password)
                .then(userCred => {
                  if (userCred) {
                    return userCred.user?.updateProfile({
                      displayName: values.displayName
                    });
                  }
                })
                .then(() => {
                  navigate('/');
                });
            }}
            isInitialValid={false}>
            {formik => (
              <Form>
                <label htmlFor="displayName" className="label">
                  Name
                </label>
                <Field name="displayName" type="text" className="input w-full mb-1" />
                <label htmlFor="email" className="label">
                  Email
                </label>
                <Field name="email" type="email" className="input w-full mb-1" />
                <label htmlFor="password" className="label">
                  Password
                </label>
                <Field name="password" type="password" className="input w-full mb-1" />
                <label htmlFor="password" className="label">
                  Verify Password
                </label>
                <Field name="passwordVerify" type="password" className="input w-full mb-1" />

                <button
                  type="submit"
                  className="btn bg-primary-500 hover:bg-primary-600 text-white w-full my-2"
                  disabled={!formik.isValid || formik.isSubmitting}>
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
