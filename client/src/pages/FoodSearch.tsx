import React from "react";
import FoodCatalogue from "../components/FoodCatalogue";

export default function FoodSearch() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Foods</h1>
      <FoodCatalogue />
    </div>
  );
}
