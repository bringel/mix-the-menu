import { Form, Formik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import MenuSettingsForm, { schema, TimeOfDayOption, Values } from '../components/MenuSettingsForm/MenuSettingsForm';
import { useUserSettingsContext } from '../contexts/UserSettingsContext';
import { DayOfWeek } from '../types/DayAndTime';

type Props = {};

const MenuSettings = (props: Props) => {
  const { settings, updatePlanDefaultSettings } = useUserSettingsContext();

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
        startDay: settings.startMenuOn,
        breakfastOptions: breakfastOptions,
        lunchOptions: lunchOptions,
        dinnerOptions: dinnerOptions,
        leftovers: settings.leftoversCount,
        takeout: settings.takeoutCount
      };
    } else {
      return {
        startDay: DayOfWeek.Sunday,
        breakfastOptions: 'slotOnly',
        lunchOptions: 'slotAndCategory',
        dinnerOptions: 'slotAndCategory',
        leftovers: 0,
        takeout: 0
      };
    }
  }, [settings]);

  const handleSave = useCallback(
    (values: Values) => {
      if (values !== undefined && values !== null) {
        const settings = {
          startMenuOn: values.startDay,
          includeSlots: {
            breakfast: values.breakfastOptions !== 'none',
            lunch: values.lunchOptions !== 'none',
            dinner: values.dinnerOptions !== 'none'
          },
          includeCategories: {
            breakfast: values.breakfastOptions === 'slotAndCategory',
            lunch: values.lunchOptions === 'slotAndCategory',
            dinner: values.dinnerOptions === 'slotAndCategory'
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
      <h3 className="text-lg font-header">Menu Settings</h3>
      <p className="text-base italic my-2">
        These settings will be used as defaults when creating a new menu. <br />
        You can adjust them for a new menu when you create one.
      </p>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSave}>
        {formik => (
          <Form className="flex flex-col w-1/2">
            <MenuSettingsForm />
            <div className="mt-2">
              <button className="btn btn-primary" disabled={!formik.isValid || formik.isSubmitting} type="submit">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MenuSettings;
