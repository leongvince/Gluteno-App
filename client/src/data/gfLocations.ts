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
