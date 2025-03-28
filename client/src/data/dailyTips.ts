import { useQuery } from '@tanstack/react-query';

const dailyTips = [
  "Soy sauce often contains wheat! Look for gluten-free tamari as an alternative when eating Asian food.",
  "Even some medications can contain gluten as a filler. Always check with your pharmacist.",
  "Cross-contamination is a major concern. Use separate toasters and cutting boards for gluten-free foods.",
  "Many oats are processed in facilities that also process wheat. Look specifically for certified gluten-free oats.",
  "Barley malt is found in many cereals and candies and is not gluten-free.",
  "Wine is generally gluten-free, but beer typically isn't. Look for specifically labeled gluten-free beers.",
  "Always read labels—ingredients in packaged foods can change without notice.",
  "French fries may be cooked in the same oil as breaded products. Ask before ordering.",
  "Many campus dining halls now offer gluten-free options. Don't be afraid to ask the staff for help.",
  "Meal prepping on weekends can save you from making poor food choices when you're busy during the week.",
  "Dorm room essentials: a mini fridge to keep your GF foods separate from roommates' foods.",
  "Rice, potatoes, and corn are naturally gluten-free and usually easily available in dining halls.",
  "Brown rice paper can be used to make amazing GF wraps for lunch on the go.",
  "Quinoa is not only gluten-free but also a complete protein—perfect for college students!",
  "Many ice creams are gluten-free, but always check for cookie pieces and malt ingredients.",
  "Plain yogurt with fresh fruit and GF granola makes a quick breakfast or snack between classes.",
  "Chickpeas and hummus are great gluten-free sources of protein for vegetarians.",
  "Keep a stash of GF snacks in your backpack for long days of classes.",
  "Many campus convenience stores now carry gluten-free options. Ask the manager if you don't see what you need.",
  "Some popular coffee shop flavored syrups contain gluten—always ask before ordering specialty drinks.",
  "Corn tortillas are usually gluten-free and make great alternatives to sandwich bread.",
  "Lipstick and makeup products can contain gluten. For those with severe sensitivity, check your cosmetics.",
  "When attending campus events, let organizers know about your dietary needs in advance.",
  "Microwave rice and beans with some GF salsa makes a quick and nutritious dorm room meal.",
  "Gluten can hide in processed meats like sausage and lunch meat—look for certified GF options.",
  "Most fresh fruits and vegetables from campus salad bars are safe options when you're in a hurry.",
  "When eating out with friends, check the restaurant menu online beforehand to identify GF options.",
  "A rice cooker can be a valuable investment for a college student with celiac disease.",
  "Sushi with rice, fish, and vegetables (without soy sauce) is often a safe choice when eating out.",
  "Always carry a card explaining celiac disease for restaurant staff in case of language barriers."
];

export function useTodayTip() {
  return useQuery({
    queryKey: ['/api/daily-tip'],
    queryFn: async () => {
      // Get today's date and use it to deterministically select a tip
      const today = new Date();
      const dayOfYear = getDayOfYear(today);
      // Use modulo to cycle through the tips
      const tipIndex = dayOfYear % dailyTips.length;
      return dailyTips[tipIndex];
    }
  });
}

// Helper function to get day of year (1-366)
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export default dailyTips;
