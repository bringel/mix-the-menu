import React from 'react';

type Props = {};

const MealPlanSettings = (props: Props) => {
  return (
    <>
      <h3 className="text-lg">Meal Plan Settings</h3>
      <p className="text-base italic my-2">
        These settings will be used as defaults when creating a new meal plan. You can adjust them for a new meal plan
        when you create it.
      </p>
      <form className="flex flex-col w-1/3">
        <label className="label" htmlFor="startDay">
          Start meal plans on
        </label>
        <select name="startDay" className="input mb-2">
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
          <input type="checkbox" name="breakfast" className="ml-2" />
        </label>
        <label className="label text-base mb-1" htmlFor="lunch">
          Include Lunch?
          <input type="checkbox" name="lunch" className="ml-2" />
        </label>
        <label className="label text-base mb-1" htmlFor="dinner">
          Include Dinner?
          <input type="checkbox" name="dinner" className="ml-2" />
        </label>
        <label className="label" htmlFor="leftovers">
          Leftovers meals
        </label>
        <input type="number" className="input mb-1" name="leftovers" />
        <label className="label" htmlFor="takeout">
          Takeout meals
        </label>
        <input type="number" className="input" name="takeout" />
      </form>
    </>
  );
};

export default MealPlanSettings;
