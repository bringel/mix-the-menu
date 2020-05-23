import React, { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useUserSettingsContext } from '../contexts/UserSettingsContext';
import useForm from '../hooks/useForm';

type Props = {};

const MealPlanSettings = (props: Props) => {
  const { settings, updatePlanDefaultSettings } = useUserSettingsContext();

  const schema = yup.object().shape({
    startDay: yup
      .string()
      .oneOf(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
      .required(),
    breakfast: yup.boolean().required(),
    lunch: yup.boolean().required(),
    dinner: yup.boolean().required(),
    leftovers: yup
      .number()
      .positive()
      .required(),
    takeout: yup
      .number()
      .positive()
      .required()
  });

  const initialValues = useMemo(() => {
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

  const { handleChange, values } = useForm(initialValues, schema);

  const handleSave = useCallback(
    e => {
      e.preventDefault();
      const validatedValues = schema.cast(values);

      if (validatedValues) {
        const settings = {
          startMealPlanOn: validatedValues.startDay,
          includeBreakfast: validatedValues.breakfast,
          includeLunch: validatedValues.lunch,
          includeDinner: validatedValues.dinner,
          leftoversCount: validatedValues.leftovers,
          takeoutCount: validatedValues.takeout
        };
        updatePlanDefaultSettings(settings);
      }
    },
    [schema, updatePlanDefaultSettings, values]
  );

  return (
    <>
      <h3 className="text-lg">Meal Plan Settings</h3>
      <p className="text-base italic my-2">
        These settings will be used as defaults when creating a new meal plan. <br />
        You can adjust them for a new meal plan when you create it.
      </p>
      <form className="flex flex-col w-1/3" onSubmit={handleSave}>
        <label className="label" htmlFor="startDay">
          Start meal plans on
        </label>
        <select name="startDay" className="input mb-2" onChange={handleChange} value={values.startDay}>
          <option>Sunday</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
        </select>
        <label className="label text-base mb-1" htmlFor="breakfast">
          Include Breakfast?
          <input type="checkbox" name="breakfast" className="ml-2" onChange={handleChange} checked={values.breakfast} />
        </label>
        <label className="label text-base mb-1" htmlFor="lunch">
          Include Lunch?
          <input type="checkbox" name="lunch" className="ml-2" onChange={handleChange} checked={values.lunch} />
        </label>
        <label className="label text-base mb-1" htmlFor="dinner">
          Include Dinner?
          <input type="checkbox" name="dinner" className="ml-2" onChange={handleChange} checked={values.dinner} />
        </label>
        <label className="label" htmlFor="leftovers">
          Leftovers meals
        </label>
        <input type="number" className="input mb-1" name="leftovers" onChange={handleChange} value={values.leftovers} />
        <label className="label" htmlFor="takeout">
          Takeout meals
        </label>
        <input type="number" className="input mb-2" name="takeout" onChange={handleChange} value={values.takeout} />

        <button className="btn bg-primary-500 text-white" type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default MealPlanSettings;
