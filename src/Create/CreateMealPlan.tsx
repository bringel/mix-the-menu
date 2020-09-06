import { addDays, getDay, startOfDay } from 'date-fns';
import {
  ErrorMessage,
  Field,
  Form,
  Formik
  } from 'formik';
import React, { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import Layout from '../components/Layout/Layout';
import { useUserSettingsContext } from '../contexts/UserSettingsContext';
import firebase from '../firebase';
import { useAuthContext } from '../firebase/FirebaseAuthContext';
import { collections } from '../firebaseCollections';
import { DayOfWeek, MealTime } from '../types/DayAndTime';
import { MealPlan, MealPlanSlot } from '../types/MealPlan';
import { MealCategory } from '../types/UserSettings';

function createMealPlanData(formValues: Values, userID: string, userCategories: Array<MealCategory>): MealPlan {
  const enabledCategories = userCategories.filter(c => formValues.categories.includes(c.id));
  const planSettings = {
    startMealPlanOn: formValues.startDay,
    includeSlots: {
      breakfast: formValues.breakfastSlot,
      lunch: formValues.lunchSlot,
      dinner: formValues.dinnerSlot
    },
    includeCategories: {
      breakfast: formValues.breakfastCategory,
      lunch: formValues.lunchCategory,
      dinner: formValues.dinnerCategory
    },
    leftoversCount: formValues.leftovers,
    takeoutCount: formValues.takeout
  };

  let startDate = startOfDay(new Date());
  let foundDay = false;
  while (!foundDay) {
    startDate = addDays(startDate, 1);
    foundDay = getDay(startDate) === formValues.startDay;
  }

  const slots: Array<MealPlanSlot> = [];
  for (let i = 0; i < 7; i++) {
    if (formValues.breakfastSlot) {
      slots.push({
        day: i,
        time: MealTime.Breakfast,
        categoryID: null,
        recipeName: null,
        recipeLink: null
      });
    }
    if (formValues.lunchSlot) {
      slots.push({
        day: i,
        time: MealTime.Lunch,
        categoryID: null,
        recipeName: null,
        recipeLink: null
      });
    }
    if (formValues.dinnerSlot) {
      slots.push({
        day: i,
        time: MealTime.Dinner,
        categoryID: null,
        recipeName: null,
        recipeLink: null
      });
    }
  }

  for (let i = 0; i < slots.length; i++) {
    if (
      (slots[i].time === MealTime.Breakfast && formValues.breakfastCategory) ||
      (slots[i].time === MealTime.Lunch && formValues.lunchCategory) ||
      (slots[i].time === MealTime.Dinner && formValues.dinnerCategory)
    ) {
      const categoryIndex = Math.floor(Math.random() * enabledCategories.length);
      slots[i].categoryID = enabledCategories[categoryIndex].id;
    }
  }

  return {
    userID: userID,
    startDate: firebase.firestore.Timestamp.fromDate(startDate),
    settings: planSettings,
    slots: slots
  };
}

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
      .required('Required'),
    categories: yup.array().min(1, 'You must have at least one category enabled').required()
  })
  .defined();

type Values = yup.InferType<typeof schema>;

const CreateMealPlan = (props: Props) => {
  const { user } = useAuthContext();
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
        takeout: settings.takeoutCount,
        categories: settings.categories.map(c => c.id)
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
        takeout: 0,
        categories: []
      };
    }
  }, [settings]);

  const handleSubmit = useCallback(
    formValues => {
      const mealPlanData = createMealPlanData(formValues, user?.uid ?? '', settings?.categories ?? []);
      const firestore = firebase.firestore();
      const collection = firestore.collection(collections.mealPlans);
      return collection.add(mealPlanData);
    },
    [settings, user]
  );

  return (
    <Layout>
      <h2 className="text-xl font-header mb-4">Create a Meal Plan</h2>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {formik => (
          <Form className="flex flex-col w-1/3">
            <label className="label" htmlFor="startDay">
              Start meal plan
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
            <div className="text-lg mt-2">Enabled Categories</div>
            {settings?.categories.map(c => {
              return (
                <label className="text-base mr-4 align-middle" htmlFor={c.id} key={c.id}>
                  <Field type="checkbox" name="categories" className="mr-1" value={c.id} id={c.id} />
                  {c.displayName}
                </label>
              );
            })}
            <ErrorMessage name="categories" component="div" className="text-error-500 text-sm mb-1" />
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
