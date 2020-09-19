import { DayOfWeek, MealTime } from './DayAndTime';
import { PlanSettings } from './PlanSettings';

export type MealPlanSlot = {
  time: MealTime;
  categoryID: string | null;
  recipeName: string | null;
  recipeLink: string | null;
};

export type MealPlanDay = {
  dayOfWeek: DayOfWeek;
  slots: Array<MealPlanSlot>;
};

export type MealPlan = {
  userID: string;
  startDate: firebase.firestore.Timestamp;
  settings: PlanSettings;
  days: Array<MealPlanDay>;
};
