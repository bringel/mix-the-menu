export type MealCategory = {
  id: string;
  displayName: string;
};

export type UserSettings = {
  categories: Array<MealCategory>;
  startMealPlanOn: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  includeLunch: boolean;
  includeDinner: boolean;
  leftoversCount: number;
  takeoutCount: number;
};
