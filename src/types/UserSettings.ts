import { MenuSettings } from './MenuSettings';

export type MealCategory = {
  id: string;
  displayName: string;
};

export type UserSettings = MenuSettings & {
  categories: Array<MealCategory>;
};
