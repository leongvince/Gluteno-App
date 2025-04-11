import React, { useState } from "react";
import { useMealPlan } from "../context/MealPlanContext"; // update if path is different
import { useToast } from "@/hooks/use-toast"; // ✅ NEW

const dummyFoods = [
  {
    id: 1,
    name: "Chicken Breast",
    type: "ingredient",
    macros: { protein: 31, carbs: 0, fat: 3.6 },
    micros: { iron: 1, calcium: 11 },
    isGlutenFree: true,
    calories: 165,
    image: "https://www.allrecipes.com/thmb/Bw4L_IuQHhHeqq52cEkWbA5PIGo=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/16160-juicy-grilled-chicken-breasts-ddmfs-5594-hero-3x4-902673c819994c0191442304b40104af.jpg"
  },
  {
    id: 2,
    name: "Nasi Lemak",
    type: "meal",
    macros: { protein: 15, carbs: 50, fat: 30 },
    micros: { iron: 2, calcium: 40 },
    isGlutenFree: false,
    calories: 455,
    image: "https://www.yummytummyaarthi.com/wp-content/uploads/2023/03/3f0d98a9-c59f-4dac-8071-4087d82aa365-scaled.jpeg"
  },
  {
    id: 3,
    name: "Greek Yogurt Parfait",
    type: "meal",
    macros: { protein: 20, carbs: 22, fat: 2 },
    micros: { iron: 0.5, calcium: 180 },
    isGlutenFree: true,
    calories: 210,
    image: "https://foolproofliving.com/wp-content/uploads/2017/12/Greek-Yogurt-Parfait-Recipe.jpg"
  },
  {
    id: 4,
    name: "Tofu Stir Fry",
    type: "meal",
    macros: { protein: 18, carbs: 12, fat: 10 },
    micros: { iron: 3.2, calcium: 150 },
    isGlutenFree: true,
    calories: 320,
    image: "https://simpleveganblog.com/wp-content/uploads/2023/01/easy-tofu-stir-fry-square.jpg"
  },
  {
    id: 5,
    name: "Egg Fried Rice",
    type: "meal",
    macros: { protein: 12, carbs: 35, fat: 15 },
    micros: { iron: 1.1, calcium: 60 },
    isGlutenFree: false,
    calories: 400,
    image: "https://www.cookerru.com/wp-content/uploads/2022/07/egg-fried-rice-main-preview.jpg"
  }
];

export default function FoodCatalogue() {
  const [search, setSearch] = useState("");
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);
  const { addToMealPlan } = useMealPlan();
  const { toast } = useToast(); // ✅ NEW

  const getTags = (food) => {
    const tags = [];
    if (food.isGlutenFree) tags.push("Gluten-Free");
    if (food.macros.protein >= 20) tags.push("High Protein");
    if (food.macros.fat <= 5) tags.push("Low Fat");
    return tags;
  };

  const filteredFoods = dummyFoods.filter((food) => {
    const matchSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchGluten = !glutenFreeOnly || food.isGlutenFree;
    return matchSearch && matchGluten;
  });

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Food Catalogue</h1>

      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Search foods..."
          className="w-full sm:w-auto flex-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={glutenFreeOnly}
            onChange={() => setGlutenFreeOnly(!glutenFreeOnly)}
            className="form-checkbox"
          />
          <span>Gluten-free only</span>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-40 object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/400x160?text=No+Image";
              }}
            />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{food.name}</h2>
                <span className="text-sm text-gray-500">
                  {food.type === "ingredient" ? "Ingredient" : "Meal"}
                </span>
              </div>
              <div className="mt-1 text-sm text-gray-600">
                <strong>Calories:</strong> {food.calories} kcal
              </div>
              <p className="text-sm">
                <strong>Protein:</strong> {food.macros.protein}g |{" "}
                <strong>Carbs:</strong> {food.macros.carbs}g |{" "}
                <strong>Fat:</strong> {food.macros.fat}g
              </p>
              <p className="text-sm">
                <strong>Iron:</strong> {food.micros.iron}mg |{" "}
                <strong>Calcium:</strong> {food.micros.calcium}mg
              </p>

              <div className="flex flex-wrap gap-1 mt-2">
                {getTags(food).map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      tag === "Gluten-Free"
                        ? "bg-yellow-100 text-yellow-700"
                        : tag === "High Protein"
                        ? "bg-blue-100 text-blue-700"
                        : tag === "Low Fat"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  addToMealPlan(food);
                  toast({
                    title: "Added to Meal Plan",
                    description: `${food.name} has been added.`,
                    duration: 2000,
                  });
                }}
                className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded text-sm font-medium"
              >
                ➕ Add to Meal Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
