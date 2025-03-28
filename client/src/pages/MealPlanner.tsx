import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { format, addDays, subDays } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import SocialFeatures from '@/components/SocialFeatures';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Recipe {
  id: number;
  name: string;
  preparationTime: string;
  budgetFriendly: boolean;
  image: string;
  favorite: boolean;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

const MealPlanner: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Format the date for display
  const formattedDate = format(selectedDate, "EEE, MMM d");
  
  // Navigation
  const goToPreviousDay = () => setSelectedDate(subDays(selectedDate, 1));
  const goToNextDay = () => setSelectedDate(addDays(selectedDate, 1));
  
  // Fetch meals for the selected date
  const { data: meals, isLoading } = useQuery({
    queryKey: [`/api/meal-logs/user/1/date/${format(selectedDate, 'yyyy-MM-dd')}`],
    queryFn: async () => {
      // This would normally fetch from the backend
      // For now, return some sample data
      return {
        breakfast: {
          id: 1,
          name: "GF Oatmeal with Berries",
          preparationTime: "5 mins",
          budgetFriendly: true,
          image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
          favorite: false,
          mealType: "breakfast"
        } as Recipe,
        lunch: {
          id: 2,
          name: "Quinoa Veggie Bowl",
          preparationTime: "15 mins",
          budgetFriendly: true,
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
          favorite: true,
          mealType: "lunch"
        } as Recipe,
        dinner: null,
        snack: {
          id: 4,
          name: "Rice Crackers & Hummus",
          preparationTime: "2 mins",
          budgetFriendly: true,
          image: "https://images.unsplash.com/photo-1576186726115-4d51596775d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
          favorite: false,
          mealType: "snack"
        } as Recipe
      };
    }
  });
  
  // Toggle favorite status
  const favoriteMutation = useMutation({
    mutationFn: async ({ recipeId, favorite }: { recipeId: number, favorite: boolean }) => {
      // This would normally update the backend
      return await apiRequest('POST', `/api/recipes/${recipeId}/favorite`, { favorite });
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: [`/api/meal-logs/user/1/date/${format(selectedDate, 'yyyy-MM-dd')}`] });
      toast({
        title: "Success",
        description: "Recipe favorite status updated",
      });
    }
  });
  
  const toggleFavorite = (recipe: Recipe) => {
    favoriteMutation.mutate({ 
      recipeId: recipe.id, 
      favorite: !recipe.favorite 
    });
  };
  
  const viewRecipe = (recipe: Recipe) => {
    toast({
      title: recipe.name,
      description: "Recipe details would open in a modal or new page",
    });
  };
  
  const addMeal = (mealType: string) => {
    toast({
      title: `Add ${mealType}`,
      description: "Meal selection would open in a modal",
    });
  };
  
  const generateWeeklyPlan = () => {
    toast({
      title: "Generate Weekly Plan",
      description: "This would create a meal plan for the entire week",
    });
  };
  
  // Render a meal card
  const renderMealCard = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', recipe: Recipe | null) => {
    if (!recipe) {
      return (
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 border-dashed flex items-center justify-center h-20 cursor-pointer"
          onClick={() => addMeal(mealType)}
        >
          <span className="text-sm text-gray-500 dark:text-gray-300">Tap to add {mealType}</span>
        </div>
      );
    }
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
        <div className="flex">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mr-3 overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=No+Image';
              }}
            />
          </div>
          <div className="flex-1">
            <h5 className="font-medium text-sm dark:text-white">{recipe.name}</h5>
            <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-300">
              <span className="flex items-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {recipe.preparationTime}
              </span>
              {recipe.budgetFriendly && (
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  Budget
                </span>
              )}
            </div>
            <div className="mt-2 flex">
              <button 
                className="text-xs text-primary dark:text-primary-foreground mr-3"
                onClick={() => viewRecipe(recipe)}
              >
                View Recipe
              </button>
              <button 
                className={`text-xs ${recipe.favorite ? 'text-red-500' : 'text-gray-500 dark:text-gray-300'}`}
                onClick={() => toggleFavorite(recipe)}
              >
                {recipe.favorite ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // For sharing the current recipe we're viewing
  const selectedRecipe = meals?.breakfast || meals?.lunch || meals?.dinner || meals?.snack;
  
  return (
    <div className="pb-16">
      <div className="px-4 py-3 bg-primary text-white sticky top-0 z-10">
        <h2 className="text-lg font-medium">Meal Planner</h2>
        <p className="text-sm opacity-90">Simple, budget-friendly GF meals</p>
      </div>
      
      <Tabs defaultValue="planner">
        <div className="border-b">
          <TabsList className="w-full flex">
            <TabsTrigger value="planner" className="flex-1">Meal Planner</TabsTrigger>
            <TabsTrigger value="social" className="flex-1">Social</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="planner">
          {/* Day Selector */}
          <div className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <button className="p-1" onClick={goToPreviousDay}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <h3 className="font-medium dark:text-white">{formattedDate}</h3>
              <button className="p-1" onClick={goToNextDay}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Meal Slots */}
          <div className="px-4 py-4">
            {isLoading ? (
              // Skeleton loading state
              Array(4).fill(null).map((_, index) => (
                <div key={index} className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 animate-pulse">
                    <div className="flex">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mr-3"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                        <div className="mt-2 flex">
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mr-3"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {/* Breakfast */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800 dark:text-white">Breakfast</h4>
                    <button className="text-sm text-primary dark:text-primary-foreground" onClick={() => addMeal('breakfast')}>Add Meal</button>
                  </div>
                  {renderMealCard('breakfast', meals?.breakfast || null)}
                </div>
                
                {/* Lunch */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800 dark:text-white">Lunch</h4>
                    <button className="text-sm text-primary dark:text-primary-foreground" onClick={() => addMeal('lunch')}>Add Meal</button>
                  </div>
                  {renderMealCard('lunch', meals?.lunch || null)}
                </div>
                
                {/* Dinner */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800 dark:text-white">Dinner</h4>
                    <button className="text-sm text-primary dark:text-primary-foreground" onClick={() => addMeal('dinner')}>Add Meal</button>
                  </div>
                  {renderMealCard('dinner', meals?.dinner || null)}
                </div>
                
                {/* Snacks */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800 dark:text-white">Snacks</h4>
                    <button className="text-sm text-primary dark:text-primary-foreground" onClick={() => addMeal('snack')}>Add Snack</button>
                  </div>
                  {renderMealCard('snack', meals?.snack || null)}
                </div>
              </>
            )}
            
            <button 
              className="w-full py-3 bg-primary text-white rounded-lg font-medium"
              onClick={generateWeeklyPlan}
            >
              Generate Weekly Meal Plan
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="social" className="px-4">
          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-2">Social Features</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with friends, share recipes, and discover new meal ideas from your network.
            </p>
            
            <SocialFeatures 
              recipeId={selectedRecipe?.id}
              recipeName={selectedRecipe?.name}
              recipeImage={selectedRecipe?.image}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MealPlanner;
