import {
  ErrorMessage,
  Field,
  Form,
  Formik
  } from 'formik';
import React, { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useUserSettingsContext } from '../contexts/UserSettingsContext';
import { DayOfWeek } from '../types/DayAndTime';

type Props = {};
const schema = yup
  .object()
  .shape({
    startDay: yup
      .number()
      .oneOf([
        DayOfWeek.Sunday,
        DayOfWeek.Monday,
        DayOfWeek.Tuesday,
        DayOfWeek.Wednesday,
        DayOfWeek.Thursday,
        DayOfWeek.Friday,
        DayOfWeek.Saturday
      ])
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

const MealPlanSettings = (props: Props) => {
  const { settings, updatePlanDefaultSettings } = useUserSettingsContext();

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
        startDay: DayOfWeek.Sunday,
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

  const handleSave = useCallback(
    (values: Values) => {
      if (values !== undefined && values !== null) {
        const settings = {
          startMealPlanOn: values.startDay,
          includeSlots: {
            breakfast: values.breakfastSlot,
            lunch: values.lunchSlot,
            dinner: values.dinnerSlot
          },
          includeCategories: {
            breakfast: values.breakfastCategory,
            lunch: values.lunchCategory,
            dinner: values.dinnerCategory
          },
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
              <option value={DayOfWeek.Sunday}>Sunday</option>
              <option value={DayOfWeek.Monday}>Monday</option>
              <option value={DayOfWeek.Tuesday}>Tuesday</option>
              <option value={DayOfWeek.Wednesday}>Wednesday</option>
              <option value={DayOfWeek.Thursday}>Thursday</option>
              <option value={DayOfWeek.Friday}>Friday</option>
              <option value={DayOfWeek.Saturday}>Saturday</option>
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
    </>
  );
};

export default MealPlanSettings;
