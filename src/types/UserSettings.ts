import { PlanSettings } from './PlanSettings';

export type MealCategory = {
  id: string;
  displayName: string;
};

export type UserSettings = PlanSettings & {
  categories: Array<MealCategory>;
};
