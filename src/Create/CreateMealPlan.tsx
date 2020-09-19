import { addDays, getDay, startOfDay } from 'date-fns';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import Layout from '../components/Layout/Layout';
import MealPlanSettingsForm, {
  schema as settingsSchema,
  TimeOfDayOption
} from '../components/MealPlanSettingsForm/MealPlanSettingsForm';
import { useUserSettingsContext } from '../contexts/UserSettingsContext';
import firebase from '../firebase';
import { useAuthContext } from '../firebase/FirebaseAuthContext';
import { collections } from '../firebaseCollections';
import { DayOfWeek, MealTime } from '../types/DayAndTime';
import { MealPlan, MealPlanDay, MealPlanSlot } from '../types/MealPlan';
import { MealCategory } from '../types/UserSettings';

function createMealPlanData(formValues: Values, userID: string, userCategories: Array<MealCategory>): MealPlan {
  const enabledCategories = userCategories.filter(c => formValues.categories.includes(c.id));
  const planSettings = {
    startMealPlanOn: formValues.startDay,
    includeSlots: {
      breakfast: formValues.breakfastOptions !== 'none',
      lunch: formValues.lunchOptions !== 'none',
      dinner: formValues.dinnerOptions !== 'none'
    },
    includeCategories: {
      breakfast: formValues.breakfastOptions === 'slotAndCategory',
      lunch: formValues.lunchOptions === 'slotAndCategory',
      dinner: formValues.dinnerOptions === 'slotAndCategory'
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

  const days: Array<MealPlanDay> = [];
  for (let i = 0; i < 7; i++) {
    const slots: Array<MealPlanSlot> = [];
    if (planSettings.includeSlots.breakfast) {
      slots.push({
        time: MealTime.Breakfast,
        categoryID: null,
        recipeName: null,
        recipeLink: null
      });
    }
    if (planSettings.includeSlots.lunch) {
      slots.push({
        time: MealTime.Lunch,
        categoryID: null,
        recipeName: null,
        recipeLink: null
      });
    }
    if (planSettings.includeSlots.dinner) {
      slots.push({
        time: MealTime.Dinner,
        categoryID: null,
        recipeName: null,
        recipeLink: null
      });
    }

    days.push({ dayOfWeek: i, slots: slots });
  }

  for (let day of days) {
    for (let slot of day.slots) {
      if (
        (slot.time === MealTime.Breakfast && planSettings.includeCategories.breakfast) ||
        (slot.time === MealTime.Lunch && planSettings.includeCategories.lunch) ||
        (slot.time === MealTime.Dinner && planSettings.includeCategories.dinner)
      ) {
        const categoryIndex = Math.floor(Math.random() * enabledCategories.length);
        slot.categoryID = enabledCategories[categoryIndex].id;
      }
    }
  }

  return {
    userID: userID,
    startDate: firebase.firestore.Timestamp.fromDate(startDate),
    settings: planSettings,
    days: days
  };
}

type Props = {};

const schema = settingsSchema.concat(
  yup
    .object()
    .shape({
      categories: yup.array().min(1, 'You must have at least one category enabled').required()
    })
    .defined()
);

type Values = yup.InferType<typeof schema>;

const CreateMealPlan = (props: Props) => {
  const { user } = useAuthContext();
  const { settings } = useUserSettingsContext();

  const initialValues: Values = useMemo(() => {
    if (settings) {
      let breakfastOptions: TimeOfDayOption = 'none';
      let lunchOptions: TimeOfDayOption = 'none';
      let dinnerOptions: TimeOfDayOption = 'none';

      if (settings.includeSlots.breakfast) {
        if (settings.includeCategories.breakfast) {
          breakfastOptions = 'slotAndCategory';
        } else {
          breakfastOptions = 'slotOnly';
        }
      }
      if (settings.includeSlots.lunch) {
        if (settings.includeCategories.lunch) {
          lunchOptions = 'slotAndCategory';
        } else {
          lunchOptions = 'slotOnly';
        }
      }
      if (settings.includeSlots.dinner) {
        if (settings.includeCategories.dinner) {
          dinnerOptions = 'slotAndCategory';
        } else {
          dinnerOptions = 'slotOnly';
        }
      }

      return {
        startDay: settings.startMealPlanOn,
        breakfastOptions: breakfastOptions,
        lunchOptions: lunchOptions,
        dinnerOptions: dinnerOptions,
        leftovers: settings.leftoversCount,
        takeout: settings.takeoutCount,
        categories: settings.categories.map(c => c.id)
      };
    } else {
      return {
        startDay: DayOfWeek.Sunday,
        breakfastOptions: 'slotOnly',
        lunchOptions: 'slotAndCategory',
        dinnerOptions: 'slotAndCategory',
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
            <MealPlanSettingsForm />
            <div className="text-lg mt-2">Enabled Categories</div>
            {settings?.categories.map(c => {
              return (
                <label className="text-base mr-4 align-middle" htmlFor={c.id} key={c.id}>
                  <Field type="checkbox" name="categories" className="mr-1 form-checkbox" value={c.id} id={c.id} />
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
