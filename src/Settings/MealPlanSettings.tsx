import {
  ErrorMessage,
  Field,
  Form,
  Formik
  } from 'formik';
import React, { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useUserSettingsContext } from '../contexts/UserSettingsContext';

type Props = {};
const schema = yup
  .object()
  .shape({
    startDay: yup
      .string()
      .oneOf(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
      .required(),
    breakfast: yup.boolean().required(),
    lunch: yup.boolean().required(),
    dinner: yup.boolean().required(),
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

const MealPlanSettings = (props: Props) => {
  const { settings, updatePlanDefaultSettings } = useUserSettingsContext();

  const initialValues: Values = useMemo(() => {
    if (settings) {
      return {
        startDay: settings.startMealPlanOn,
        breakfast: settings.includeBreakfast,
        lunch: settings.includeLunch,
        dinner: settings.includeDinner,
        leftovers: settings.leftoversCount,
        takeout: settings.takeoutCount
      };
    } else {
      return {
        startDay: 'Sunday',
        breakfast: true,
        lunch: true,
        dinner: true,
        leftovers: 0,
        takeout: 0
      };
    }
  }, [settings]);

  const handleSave = useCallback(
    (values: Values) => {
      if (values !== undefined && values !== null) {
        const settings = {
          startMealPlanOn: values.startDay,
          includeBreakfast: values.breakfast,
          includeLunch: values.lunch,
          includeDinner: values.dinner,
          leftoversCount: values.leftovers,
          takeoutCount: values.takeout
        };
        return updatePlanDefaultSettings(settings);
      }
    },
    [updatePlanDefaultSettings]
  );

  return (
    <>
      <h3 className="text-lg font-header">Meal Plan Settings</h3>
      <p className="text-base italic my-2">
        These settings will be used as defaults when creating a new meal plan. <br />
        You can adjust them for a new meal plan when you create one.
      </p>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSave}>
        {formik => (
          <Form className="flex flex-col w-1/3">
            <label className="label" htmlFor="startDay">
              Start meal plans on
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
            <label className="label text-base mb-1" htmlFor="breakfast">
              Include Breakfast?
              <Field type="checkbox" name="breakfast" className="ml-2" />
            </label>
            <label className="label text-base mb-1" htmlFor="lunch">
              Include Lunch?
              <Field type="checkbox" name="lunch" className="ml-2" />
            </label>
            <label className="label text-base mb-1" htmlFor="dinner">
              Include Dinner?
              <Field type="checkbox" name="dinner" className="ml-2" />
            </label>
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
              className="btn bg-primary-500 text-white mt-2"
              disabled={!formik.isValid || formik.isSubmitting}
              type="submit">
              Save
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MealPlanSettings;
