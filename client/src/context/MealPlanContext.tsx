// MealPlanContext.tsx

import { createContext, useContext, useState, ReactNode } from "react";

interface FoodItem {
  id: number;
  name: string;
  type: string;
  macros: { protein: number; carbs: number; fat: number };
  micros: { iron: number; calcium: number };
  isGlutenFree: boolean;
  calories: number;
  image: string;
}

interface MealPlanContextType {
  mealPlan: FoodItem[];
  addToMealPlan: (food: FoodItem) => void;
  clearMealPlan: () => void;
}

const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

export const MealPlanProvider = ({ children }: { children: ReactNode }) => {
  const [mealPlan, setMealPlan] = useState<FoodItem[]>([]);

  const addToMealPlan = (food: FoodItem) => {
    console.log("✅ Added to meal plan:", food);
    setMealPlan((prev) => [...prev, food]);
  };

  const clearMealPlan = () => setMealPlan([]);

  return (
    <MealPlanContext.Provider value={{ mealPlan, addToMealPlan, clearMealPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (!context) throw new Error("useMealPlan must be used within MealPlanProvider");
  return context;
};
