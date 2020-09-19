import { ErrorMessage, Field } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { DayOfWeek } from '../../types/DayAndTime';

type Props = {};

export const schema = yup
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
    breakfastOptions: yup.string().oneOf(['none', 'slotOnly', 'slotAndCategory']).required(),
    lunchOptions: yup.string().oneOf(['none', 'slotOnly', 'slotAndCategory']).required(),
    dinnerOptions: yup.string().oneOf(['none', 'slotOnly', 'slotAndCategory']).required(),
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

export type Values = yup.InferType<typeof schema>;
export type TimeOfDayOption = 'none' | 'slotOnly' | 'slotAndCategory';

const MealPlanSettingsForm = (props: Props) => {
  return (
    <>
      <label htmlFor="startDay">Start meal plans on</label>
      <Field as="select" name="startDay" className="form-select mb-2">
        <option value={DayOfWeek.Sunday}>Sunday</option>
        <option value={DayOfWeek.Monday}>Monday</option>
        <option value={DayOfWeek.Tuesday}>Tuesday</option>
        <option value={DayOfWeek.Wednesday}>Wednesday</option>
        <option value={DayOfWeek.Thursday}>Thursday</option>
        <option value={DayOfWeek.Friday}>Friday</option>
        <option value={DayOfWeek.Saturday}>Saturday</option>
      </Field>
      <div className="mb-2">
        <p className="text-base italic">Breakfast:</p>
        <label className="mr-4 inline-flex items-center">
          <Field type="radio" name="breakfastOptions" value="none" className="mr-1 form-radio" />
          None
        </label>
        <label className="mr-4 inline-flex items-center">
          <Field type="radio" name="breakfastOptions" value="slotOnly" className="mr-1 form-radio" />
          Slot Only
        </label>
        <label className="mr-4 inline-flex items-center">
          <Field type="radio" name="breakfastOptions" value="slotAndCategory" className="mr-1 form-radio" />
          Slot and Category
        </label>

        <p className="text-base italic">Lunch:</p>
        <label className="mr-4 inline-flex items-center">
          <Field type="radio" name="lunchOptions" value="none" className="mr-1 form-radio" />
          None
        </label>
        <label className="mr-4 inline-flex items-center">
          <Field type="radio" name="lunchOptions" value="slotOnly" className="mr-1 form-radio" />
          Slot Only
        </label>
        <label className="mr-4 inline-flex items-center">
          <Field type="radio" name="lunchOptions" value="slotAndCategory" className="mr-1 form-radio" />
          Slot and Category
        </label>
        <p className="text-base italic">Dinner:</p>
        <label className="mr-4 inline-flex items-center">
          <Field type="radio" name="dinnerOptions" value="none" className="mr-1 form-radio" />
          None
        </label>
        <label className="mr-4 inline-flex items-center">
          <Field type="radio" name="dinnerOptions" value="slotOnly" className="mr-1 form-radio" />
          Slot Only
        </label>
        <label className="mr-4 inline-flex items-center">
          <Field type="radio" name="dinnerOptions" value="slotAndCategory" className="mr-1 form-radio" />
          Slot and Category
        </label>
      </div>
      <label htmlFor="leftovers">Leftovers meals</label>
      <Field type="number" className="form-input mb-1" name="leftovers" />
      <ErrorMessage name="leftovers" component="div" className="text-error-500 text-sm" />
      <label htmlFor="takeout">Takeout meals</label>
      <Field type="number" className="form-input mb-1" name="takeout" />
      <ErrorMessage name="takeout" component="div" className="text-error-500 text-sm mb-1" />
    </>
  );
};

export default MealPlanSettingsForm;
