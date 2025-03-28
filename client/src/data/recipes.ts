export interface Recipe {
  id: number;
  name: string;
  image: string;
  preparationTime: string;
  cookingTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number;
  budgetFriendly: boolean;
  favorite: boolean;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients: string[];
  instructions: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  tags: string[];
}

const recipes: Recipe[] = [
  {
    id: 1,
    name: "GF Oatmeal with Berries",
    image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    preparationTime: "5 mins",
    cookingTime: "3 mins",
    difficulty: "easy",
    servings: 1,
    budgetFriendly: true,
    favorite: false,
    mealType: "breakfast",
    ingredients: [
      "1/2 cup certified gluten-free rolled oats",
      "1 cup water or milk (dairy or non-dairy)",
      "1/4 cup mixed berries (fresh or frozen)",
      "1 tbsp honey or maple syrup (optional)",
      "1 tsp chia seeds (optional)"
    ],
    instructions: [
      "Combine oats and liquid in a microwave-safe bowl.",
      "Microwave on high for 2-3 minutes, stirring halfway.",
      "Top with berries, sweetener, and chia seeds if desired."
    ],
    nutritionInfo: {
      calories: 210,
      protein: 5,
      carbs: 42,
      fat: 3
    },
    tags: ["vegetarian", "vegan-option", "quick", "dorm-friendly"]
  },
  {
    id: 2,
    name: "Quinoa Veggie Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    preparationTime: "15 mins",
    cookingTime: "20 mins",
    difficulty: "medium",
    servings: 2,
    budgetFriendly: true,
    favorite: true,
    mealType: "lunch",
    ingredients: [
      "1 cup uncooked quinoa",
      "2 cups vegetable broth",
      "1 bell pepper, diced",
      "1 cucumber, diced",
      "1/4 red onion, finely chopped",
      "1 can chickpeas, drained and rinsed",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "Salt and pepper to taste",
      "1/4 cup feta cheese (optional)"
    ],
    instructions: [
      "Rinse quinoa thoroughly. Combine with vegetable broth in a saucepan.",
      "Bring to a boil, then reduce heat and simmer for 15-20 minutes until liquid is absorbed.",
      "While quinoa cooks, prepare vegetables and chickpeas.",
      "Fluff quinoa with a fork and let cool slightly.",
      "Combine all ingredients in a bowl and mix well.",
      "Drizzle with olive oil and lemon juice. Season with salt and pepper.",
      "Top with feta cheese if desired."
    ],
    nutritionInfo: {
      calories: 420,
      protein: 15,
      carbs: 58,
      fat: 16
    },
    tags: ["vegetarian", "meal-prep", "protein-rich"]
  },
  {
    id: 3,
    name: "Simple GF Pasta",
    image: "https://images.unsplash.com/photo-1567608285969-48e4bbe0d399?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    preparationTime: "5 mins",
    cookingTime: "10 mins",
    difficulty: "easy",
    servings: 1,
    budgetFriendly: true,
    favorite: false,
    mealType: "dinner",
    ingredients: [
      "2 oz gluten-free pasta",
      "1/2 cup marinara sauce",
      "1 tbsp olive oil",
      "1 clove garlic, minced",
      "1/4 tsp red pepper flakes (optional)",
      "Grated parmesan cheese (optional)",
      "Fresh basil leaves (optional)"
    ],
    instructions: [
      "Cook pasta according to package directions. Be careful not to overcook.",
      "In a small pan, heat olive oil over medium heat.",
      "Add garlic and red pepper flakes, sauté for 30 seconds.",
      "Add marinara sauce and heat through.",
      "Drain pasta and add to sauce, tossing to coat.",
      "Top with parmesan and basil if desired."
    ],
    nutritionInfo: {
      calories: 350,
      protein: 8,
      carbs: 52,
      fat: 14
    },
    tags: ["vegetarian", "quick", "dorm-friendly"]
  },
  {
    id: 4,
    name: "Rice Crackers & Hummus",
    image: "https://images.unsplash.com/photo-1576186726115-4d51596775d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    preparationTime: "2 mins",
    cookingTime: "0 mins",
    difficulty: "easy",
    servings: 1,
    budgetFriendly: true,
    favorite: false,
    mealType: "snack",
    ingredients: [
      "10-15 gluten-free rice crackers",
      "1/4 cup store-bought hummus",
      "Cucumber slices (optional)",
      "Cherry tomatoes (optional)",
      "Sprinkle of paprika (optional)"
    ],
    instructions: [
      "Arrange crackers on a plate.",
      "Serve with hummus for dipping.",
      "Add cucumber slices and cherry tomatoes on the side if desired.",
      "Sprinkle hummus with paprika for extra flavor."
    ],
    nutritionInfo: {
      calories: 180,
      protein: 5,
      carbs: 26,
      fat: 8
    },
    tags: ["vegetarian", "vegan", "no-cook", "dorm-friendly"]
  },
  {
    id: 5,
    name: "Mexican Rice Bowl",
    image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    preparationTime: "10 mins",
    cookingTime: "20 mins",
    difficulty: "medium",
    servings: 2,
    budgetFriendly: true,
    favorite: false,
    mealType: "dinner",
    ingredients: [
      "1 cup rice",
      "1 can black beans, drained and rinsed",
      "1 bell pepper, sliced",
      "1 small onion, diced",
      "1 avocado, sliced",
      "1/4 cup salsa (check for GF)",
      "1 tbsp olive oil",
      "1 tsp cumin",
      "1/2 tsp chili powder",
      "Salt and pepper to taste",
      "Lime wedges for serving",
      "Fresh cilantro (optional)"
    ],
    instructions: [
      "Cook rice according to package directions.",
      "In a pan, heat olive oil over medium heat.",
      "Add onion and pepper, sauté until softened.",
      "Add beans, cumin, chili powder, salt, and pepper. Cook for 3-5 minutes.",
      "Serve bean mixture over rice.",
      "Top with avocado slices and salsa.",
      "Garnish with lime wedges and cilantro if desired."
    ],
    nutritionInfo: {
      calories: 450,
      protein: 12,
      carbs: 78,
      fat: 11
    },
    tags: ["vegetarian", "vegan", "protein-rich"]
  },
  {
    id: 6,
    name: "Greek Yogurt Parfait",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    preparationTime: "5 mins",
    cookingTime: "0 mins",
    difficulty: "easy",
    servings: 1,
    budgetFriendly: true,
    favorite: false,
    mealType: "breakfast",
    ingredients: [
      "1 cup Greek yogurt",
      "1/4 cup certified gluten-free granola",
      "1/2 cup mixed berries",
      "1 tbsp honey",
      "1 tsp chia seeds (optional)"
    ],
    instructions: [
      "In a glass or bowl, layer half the yogurt.",
      "Add half the berries and half the granola.",
      "Repeat layers with remaining ingredients.",
      "Drizzle with honey and sprinkle with chia seeds if desired."
    ],
    nutritionInfo: {
      calories: 340,
      protein: 25,
      carbs: 45,
      fat: 8
    },
    tags: ["vegetarian", "no-cook", "protein-rich", "dorm-friendly"]
  }
];

export async function getRecipes(): Promise<Recipe[]> {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(recipes);
    }, 500);
  });
}

export async function getRecipesByType(mealType: string): Promise<Recipe[]> {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = recipes.filter(recipe => recipe.mealType === mealType);
      resolve(filtered);
    }, 500);
  });
}

export async function getRecipeById(id: number): Promise<Recipe | undefined> {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const recipe = recipes.find(r => r.id === id);
      resolve(recipe);
    }, 500);
  });
}

export default recipes;
