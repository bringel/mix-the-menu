import { DayOfWeek } from './DayAndTime';

export type PlanSettings = {
  startMealPlanOn: DayOfWeek;
  includeBreakfast: boolean;
  includeLunch: boolean;
  includeDinner: boolean;
  leftoversCount: number;
  takeoutCount: number;
};
