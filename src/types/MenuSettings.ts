import { DayOfWeek } from './DayAndTime';

export type MenuSettings = {
  startMenuOn: DayOfWeek;
  includeSlots: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  includeCategories: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  leftoversCount: number;
  takeoutCount: number;
};
