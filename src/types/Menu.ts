import { DayOfWeek, MealTime } from './DayAndTime';
import { MenuSettings } from './MenuSettings';

export type MenuSlot = {
  time: MealTime;
  categoryID: string | null;
  recipeName: string | null;
  recipeLink: string | null;
};

export type MenuDay = {
  dayOfWeek: DayOfWeek;
  slots: Array<MenuSlot>;
};

export type Menu = {
  userID: string;
  startDate: firebase.firestore.Timestamp;
  settings: MenuSettings;
  days: Array<MenuDay>;
};
