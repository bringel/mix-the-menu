import { DayOfWeek } from './DayAndTime';

export type PlanSettings = {
  startMealPlanOn: DayOfWeek;
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
