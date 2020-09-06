import { DayOfWeek, MealTime } from './DayAndTime';
import { PlanSettings } from './PlanSettings';

export type MealPlanSlot = {
  day: DayOfWeek;
  time: MealTime;
  categoryID: string | null;
  recipeName: string | null;
  recipeLink: string | null;
};

export type MealPlan = {
  userID: string;
  startDate: firebase.firestore.Timestamp;
  settings: PlanSettings;
  slots: Array<MealPlanSlot>;
};
