import { Restaurant } from '@/lib/mapUtils';

// Data representing gluten-free restaurant options across Singapore
// This would typically come from an API but for this example, we'll use static data
const gfLocations: Restaurant[] = [
  // NTU Area
  {
    id: 1,
    name: "Green Earth Café",
    status: "verified",
    distance: "300m",
    priceRange: "$$",
    cuisine: "Asian Fusion",
    rating: 4,
    reviewCount: 42,
    gfOption: "GF menu available",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3483 + 0.003,
    lng: 103.6831 + 0.002
  },
  {
    id: 2,
    name: "Campus Bowl",
    status: "check",
    distance: "150m",
    priceRange: "$",
    cuisine: "Bowls & Salads",
    rating: 3,
    reviewCount: 28,
    gfOption: "Ask about cross-contamination",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3483 + 0.001,
    lng: 103.6831 - 0.002
  },
  {
    id: 3,
    name: "Sunrise Smoothies",
    status: "verified",
    distance: "450m",
    priceRange: "$$",
    cuisine: "Healthy Drinks",
    rating: 5,
    reviewCount: 64,
    gfOption: "All smoothies GF certified",
    image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3483 - 0.002,
    lng: 103.6831 - 0.003
  },
  {
    id: 4,
    name: "Nutri Bowl",
    status: "verified",
    distance: "200m",
    priceRange: "$$",
    cuisine: "Healthy Bowls",
    rating: 4,
    reviewCount: 38,
    gfOption: "GF options clearly marked",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3483 - 0.001,
    lng: 103.6831 + 0.001
  },
  {
    id: 5,
    name: "Pure Kitchen",
    status: "verified",
    distance: "500m",
    priceRange: "$$$",
    cuisine: "Modern European",
    rating: 5,
    reviewCount: 87,
    gfOption: "Dedicated GF kitchen",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3483 + 0.005,
    lng: 103.6831 - 0.001
  },
  {
    id: 6,
    name: "Student Canteen Kiosk C",
    status: "check",
    distance: "50m",
    priceRange: "$",
    cuisine: "Mixed",
    rating: 3,
    reviewCount: 122,
    gfOption: "Some labeled GF options",
    image: "https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3483,
    lng: 103.6831
  },
  {
    id: 7,
    name: "Veggie Village",
    status: "verified",
    distance: "350m",
    priceRange: "$$",
    cuisine: "Vegetarian",
    rating: 4,
    reviewCount: 56,
    gfOption: "Most items GF, clearly marked",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3483 - 0.003,
    lng: 103.6831 + 0.004
  },
  {
    id: 8,
    name: "Library Café",
    status: "check",
    distance: "100m",
    priceRange: "$",
    cuisine: "Coffee & Snacks",
    rating: 4,
    reviewCount: 34,
    gfOption: "GF snacks available on request",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3483 + 0.001,
    lng: 103.6831 + 0.001
  },
  
  // Orchard Road Area
  {
    id: 9,
    name: "Grain Traders",
    status: "verified",
    distance: "3.2km",
    priceRange: "$$",
    cuisine: "Bowls & Grains",
    rating: 4.5,
    reviewCount: 78,
    gfOption: "Many GF options available",
    image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3041,
    lng: 103.8316
  },
  {
    id: 10,
    name: "Real Food",
    status: "verified",
    distance: "3.5km",
    priceRange: "$$",
    cuisine: "Vegetarian/Vegan",
    rating: 4.3,
    reviewCount: 65,
    gfOption: "GF options clearly labeled",
    image: "https://images.unsplash.com/photo-1604480133435-25b86862d276?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3022,
    lng: 103.8368
  },
  {
    id: 17,
    name: "Gluten-Free Delights",
    status: "verified",
    distance: "3.7km",
    priceRange: "$$",
    cuisine: "Bakery",
    rating: 4.8,
    reviewCount: 93,
    gfOption: "100% GF dedicated bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3035,
    lng: 103.8345
  },
  {
    id: 18,
    name: "Celiac Safe Kitchen",
    status: "verified",
    distance: "4.0km",
    priceRange: "$$$",
    cuisine: "International",
    rating: 4.9,
    reviewCount: 106,
    gfOption: "Certified gluten-free facility",
    image: "https://images.unsplash.com/photo-1564759077036-3def472ffd3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3010,
    lng: 103.8320
  },
  
  // Marina Bay Area
  {
    id: 11,
    name: "SaladStop!",
    status: "check",
    distance: "5.1km",
    priceRange: "$$",
    cuisine: "Salads & Bowls",
    rating: 4.2,
    reviewCount: 92,
    gfOption: "Ask for GF ingredients",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.2819,
    lng: 103.8585
  },
  {
    id: 12,
    name: "The Green Bar",
    status: "verified",
    distance: "5.3km",
    priceRange: "$$$",
    cuisine: "Healthy Cafe",
    rating: 4.7,
    reviewCount: 43,
    gfOption: "Certified GF menu available",
    image: "https://images.unsplash.com/photo-1601314002592-b8734bca6604?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.2834,
    lng: 103.8607
  },
  {
    id: 19,
    name: "Bay Breeze Bowls",
    status: "verified",
    distance: "5.5km",
    priceRange: "$$",
    cuisine: "Açaí & Smoothie Bowls",
    rating: 4.6,
    reviewCount: 82,
    gfOption: "All bowls are GF, dedicated prep area",
    image: "https://images.unsplash.com/photo-1590301157890-8679078c4616?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.2840,
    lng: 103.8570
  },
  {
    id: 20,
    name: "Marina's Gluten Haven",
    status: "verified",
    distance: "5.8km",
    priceRange: "$$$",
    cuisine: "Italian",
    rating: 4.5,
    reviewCount: 74,
    gfOption: "GF pasta and pizza options",
    image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.2810,
    lng: 103.8540
  },
  
  // East Coast Area
  {
    id: 13,
    name: "Sarnies",
    status: "check",
    distance: "7.2km",
    priceRange: "$$",
    cuisine: "Cafe",
    rating: 4.1,
    reviewCount: 57,
    gfOption: "GF bread available upon request",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3113,
    lng: 103.9385
  },
  {
    id: 14,
    name: "Kitchen by Food Rebel",
    status: "verified",
    distance: "7.5km",
    priceRange: "$$",
    cuisine: "Healthy Food",
    rating: 4.4,
    reviewCount: 68,
    gfOption: "GF alternatives for most dishes",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3145,
    lng: 103.9427
  },
  {
    id: 21,
    name: "Coast Celiac Cafe",
    status: "verified",
    distance: "7.8km",
    priceRange: "$$",
    cuisine: "Brunch",
    rating: 4.7,
    reviewCount: 91,
    gfOption: "Full GF menu with dedicated kitchen",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3160,
    lng: 103.9450
  },
  {
    id: 22,
    name: "Seaside GF Grill",
    status: "verified",
    distance: "8.1km",
    priceRange: "$$$",
    cuisine: "Seafood",
    rating: 4.8,
    reviewCount: 64,
    gfOption: "All grilled items GF, separate prep area",
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3180,
    lng: 103.9410
  },
  
  // Bugis Area
  {
    id: 15,
    name: "Super Loco",
    status: "check",
    distance: "4.6km",
    priceRange: "$$",
    cuisine: "Mexican",
    rating: 4.3,
    reviewCount: 104,
    gfOption: "GF options available, ask staff",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.2997,
    lng: 103.8563
  },
  {
    id: 16,
    name: "The Living Cafe",
    status: "verified",
    distance: "6.8km",
    priceRange: "$$$",
    cuisine: "Raw Food",
    rating: 4.6,
    reviewCount: 72,
    gfOption: "Most menu items are GF",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.2993,
    lng: 103.8192
  },
  {
    id: 23,
    name: "Bugis Allergen-Free Zone",
    status: "verified",
    distance: "4.9km",
    priceRange: "$$",
    cuisine: "Asian Fusion",
    rating: 4.5,
    reviewCount: 87,
    gfOption: "Allergen-free environment, 100% GF",
    image: "https://images.unsplash.com/photo-1559314809-4d1972cf29f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3005,
    lng: 103.8550
  },
  {
    id: 24,
    name: "GF Street Food Market",
    status: "verified",
    distance: "5.2km",
    priceRange: "$$",
    cuisine: "Street Food",
    rating: 4.4,
    reviewCount: 76,
    gfOption: "Multiple GF vendors in one location",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3010,
    lng: 103.8580
  },
  
  // Jurong East Area
  {
    id: 25,
    name: "Westside GF Bistro",
    status: "verified",
    distance: "4.5km",
    priceRange: "$$",
    cuisine: "Western",
    rating: 4.3,
    reviewCount: 68,
    gfOption: "Separate GF menu with certification",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3330,
    lng: 103.7420
  },
  {
    id: 26,
    name: "Jurong Celiac Sanctuary",
    status: "verified",
    distance: "4.8km",
    priceRange: "$$$",
    cuisine: "International",
    rating: 4.7,
    reviewCount: 59,
    gfOption: "100% gluten-free facility",
    image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.3350,
    lng: 103.7380
  },
  
  // Sentosa
  {
    id: 27,
    name: "Island GF Retreat",
    status: "verified",
    distance: "10.2km",
    priceRange: "$$$",
    cuisine: "Mediterranean",
    rating: 4.9,
    reviewCount: 112,
    gfOption: "Premium GF dining experience",
    image: "https://images.unsplash.com/photo-1570696516188-ade861b84a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.2494,
    lng: 103.8303
  },
  {
    id: 28,
    name: "Beach Celiac Bar",
    status: "verified",
    distance: "10.5km",
    priceRange: "$$",
    cuisine: "Tropical",
    rating: 4.6,
    reviewCount: 89,
    gfOption: "GF cocktails and food menu",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    lat: 1.2480,
    lng: 103.8290
  }
];

export async function getGFLocations(): Promise<Restaurant[]> {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(gfLocations);
    }, 500);
  });
}

export default gfLocations;
