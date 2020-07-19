import {
  ErrorMessage,
  Field,
  Form,
  Formik
  } from 'formik';
import React, { useMemo } from 'react';
import * as yup from 'yup';
import Layout from '../components/Layout/Layout';
import { useUserSettingsContext } from '../contexts/UserSettingsContext';

type Props = {};

const schema = yup
  .object()
  .shape({
    startDay: yup
      .string()
      .oneOf(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
      .required(),
    breakfastSlot: yup.boolean().required(),
    lunchSlot: yup.boolean().required(),
    dinnerSlot: yup.boolean().required(),
    breakfastCategory: yup.boolean().required(),
    lunchCategory: yup.boolean().required(),
    dinnerCategory: yup.boolean().required(),
    leftovers: yup
      .number()
      .integer('Number of leftovers days needs to be an integer')
      .min(0, 'Number of leftovers days must be 0 or more')
      .required('Required'),
    takeout: yup
      .number()
      .integer('Number of takeout days needs to be an integer')
      .min(0, 'Number of takeout days must be 0 or more')
      .required('Required')
  })
  .defined();

type Values = yup.InferType<typeof schema>;

const CreateMealPlan = (props: Props) => {
  const { settings } = useUserSettingsContext();

  const initialValues: Values = useMemo(() => {
    if (settings) {
      return {
        startDay: settings.startMealPlanOn,
        breakfastSlot: settings.includeSlots?.breakfast,
        lunchSlot: settings.includeSlots?.lunch,
        dinnerSlot: settings.includeSlots?.dinner,
        breakfastCategory: settings.includeCategories?.breakfast,
        lunchCategory: settings.includeCategories?.lunch,
        dinnerCategory: settings.includeCategories?.dinner,
        leftovers: settings.leftoversCount,
        takeout: settings.takeoutCount
      };
    } else {
      return {
        startDay: 'Sunday',
        breakfastSlot: true,
        lunchSlot: true,
        dinnerSlot: true,
        breakfastCategory: false,
        lunchCategory: true,
        dinnerCategory: true,
        leftovers: 0,
        takeout: 0
      };
    }
  }, [settings]);
  return (
    <Layout>
      <h2 className="text-xl font-header mb-4">Create a Meal Plan</h2>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={() => {}}>
        {formik => (
          <Form className="flex flex-col w-1/3">
            <label className="label" htmlFor="startDay">
              Start meal plan
            </label>
            <Field as="select" name="startDay" className="input mb-2">
              <option>Sunday</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
            </Field>
            <div className="mb-2">
              <p className="text-base italic">Include meal plan slots for:</p>
              <label className="text-base mr-4 align-middle" htmlFor="breakfast">
                <Field type="checkbox" name="breakfastSlot" className="mr-1" />
                Breakfast
              </label>
              <label className="text-base mr-4 align-middle" htmlFor="lunch">
                <Field type="checkbox" name="lunchSlot" className="mr-1" />
                Lunch
              </label>
              <label className="text-base align-middle" htmlFor="dinner">
                <Field type="checkbox" name="dinnerSlot" className="mr-1" />
                Dinner
              </label>
            </div>
            <div className="mb-2">
              <p className="text-base italic">Pick random category for:</p>
              <label className="text-base mr-4 align-middle" htmlFor="breakfast">
                <Field type="checkbox" name="breakfastCategory" className="mr-1" />
                Breakfast
              </label>
              <label className="text-base mr-4 align-middle" htmlFor="lunch">
                <Field type="checkbox" name="lunchCategory" className="mr-1" />
                Lunch
              </label>
              <label className="text-base align-middle" htmlFor="dinner">
                <Field type="checkbox" name="dinnerCategory" className="mr-1" />
                Dinner
              </label>
            </div>
            <label className="label" htmlFor="leftovers">
              Leftovers meals
            </label>
            <Field type="number" className="input mb-1" name="leftovers" />
            <ErrorMessage name="leftovers" component="div" className="text-error-500 text-sm" />
            <label className="label" htmlFor="takeout">
              Takeout meals
            </label>
            <Field type="number" className="input mb-1" name="takeout" />
            <ErrorMessage name="takeout" component="div" className="text-error-500 text-sm mb-1" />
            <button
              className="btn bg-primary-500 hover:bg-primary-600 text-white mt-2"
              disabled={!formik.isValid || formik.isSubmitting}
              type="submit">
              Save
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreateMealPlan;
