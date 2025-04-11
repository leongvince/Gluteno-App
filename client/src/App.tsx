import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MealPlanProvider } from "./context/MealPlanContext"; // adjust if needed

// Pages
import Home from "@/pages/Home";
import GFRadar from "@/pages/GFRadar";
import LearnZone from "@/pages/LearnZone";
import MealPlanner from "@/pages/MealPlanner";
import Community from "@/pages/Community";
import ProgressTracker from "@/pages/ProgressTracker";
import NotFound from "@/pages/not-found";
import FoodSearch from "./pages/FoodSearch";




// Components
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { useState, useEffect } from "react";

function Router() {
  const [location] = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto dark:text-gray-100 pb-16"> {/* Added pb-16 to ensure content has padding at bottom */}
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/gf-radar" component={GFRadar} />
          <Route path="/learn-zone" component={LearnZone} />
          <Route path="/meal-planner" component={MealPlanner} />
          <Route path="/community" component={Community} />
          <Route path="/progress-tracker" component={ProgressTracker} />
          <Route path="/food-search" component={FoodSearch} />  {/* 👈 ADD THIS */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <BottomNavigation currentPath={location} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
  <MealPlanProvider>
    <Router />
    <Toaster />
  </MealPlanProvider>
</QueryClientProvider>
</ThemeProvider>

  );
}

export default App;
