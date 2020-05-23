export type MealCategory = {
  id: string;
  displayName: string;
};

export type PlanSettings = {
  startMealPlanOn: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  includeBreakfast: boolean;
  includeLunch: boolean;
  includeDinner: boolean;
  leftoversCount: number;
  takeoutCount: number;
};

export type UserSettings = PlanSettings & {
  categories: Array<MealCategory>;
};
