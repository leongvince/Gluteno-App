# Save the full FoodCatalogue component as a .tsx file for the user to download
component_code = """
import React, { useState } from "react";

const dummyFoods = [
  {
    id: 1,
    name: "Chicken Breast",
    type: "ingredient",
    macros: { protein: 31, carbs: 0, fat: 3.6 },
    micros: { iron: 1, calcium: 11 },
    isGlutenFree: true,
    userSubmitted: false,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb88b" // Chicken Breast
  },
  {
    id: 2,
    name: "Nasi Lemak",
    type: "meal",
    macros: { protein: 15, carbs: 50, fat: 30 },
    micros: { iron: 2, calcium: 40 },
    isGlutenFree: false,
    userSubmitted: true,
    image: "https://images.unsplash.com/photo-1604908554265-597a8d69a02a" // Nasi Lemak
  }
];

export default function FoodCatalogue() {
  const [search, setSearch] = useState("");
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);

  const filteredFoods = dummyFoods.filter(food => {
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
          className="w-full sm:w-auto flex-1 border border-gray-300 rounded px-3 py-2"
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
            />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{food.name}</h2>
                <span className="text-sm text-gray-500">
                  {food.type === "ingredient" ? "Ingredient" : "Meal"}
                </span>
              </div>
              <p className="text-sm mt-1">
                <strong>Protein:</strong> {food.macros.protein}g | <strong>Carbs:</strong> {food.macros.carbs}g | <strong>Fat:</strong> {food.macros.fat}g
              </p>
              <p className="text-sm">
                <strong>Iron:</strong> {food.micros.iron}mg | <strong>Calcium:</strong> {food.micros.calcium}mg
              </p>
              <p className="text-sm mt-1">
                <span className={\`font-medium \${food.isGlutenFree ? "text-green-600" : "text-red-500"}\`}>
                  {food.isGlutenFree ? "Gluten-Free" : "Contains Gluten"}
                </span>
              </p>
              {food.userSubmitted && (
                <p className="text-xs italic text-blue-600 mt-1">User Submitted</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
"""

file_path = "/mnt/data/FoodCatalogue.tsx"
with open(file_path, "w") as f:
    f.write(component_code)

file_path
