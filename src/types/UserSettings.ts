export type MealCategory = {
  id: string;
  displayName: string;
};

export type UserSettings = {
  categories: Array<MealCategory>;
};
