import L from 'leaflet';
import { getGFLocations as fetchGFLocations } from '@/data/gfLocations';

export interface Restaurant {
  id: number;
  name: string;
  status: 'verified' | 'check';
  distance: string;
  priceRange: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  gfOption: string;
  image: string;
  lat: number;
  lng: number;
}

// Fix Leaflet marker icon issue
export const setupLeafletIcons = () => {
  const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  L.Marker.prototype.options.icon = defaultIcon;
};

// Custom marker icons for different statuses
export const verifiedIcon = L.divIcon({
  className: 'custom-pin pin-verified',
  html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export const checkIcon = L.divIcon({
  className: 'custom-pin pin-check',
  html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});



export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'verified':
      return verifiedIcon;
    case 'check':
      return checkIcon;
    default:
      return L.Marker.prototype.options.icon;
  }
};

// Filter restaurants based on criteria
export const filterRestaurants = (
  restaurants: Restaurant[],
  { searchQuery = '', filter = '' }: { searchQuery?: string; filter?: string }
) => {
  let filtered = [...restaurants];

  // Apply search filter if provided
  if (searchQuery) {
    const searchLower = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchLower) ||
        restaurant.cuisine.toLowerCase().includes(searchLower)
    );
  }

  // Apply specific filters
  if (filter) {
    switch (filter) {
      case 'price':
        filtered = filtered.sort((a, b) => {
          const priceA = a.priceRange.length;
          const priceB = b.priceRange.length;
          return priceA - priceB;
        });
        break;
      case 'distance':
        filtered = filtered.sort((a, b) => {
          const distA = parseInt(a.distance.replace(/[^0-9]/g, ''));
          const distB = parseInt(b.distance.replace(/[^0-9]/g, ''));
          return distA - distB;
        });
        break;
      case 'student':
        // Assuming rating is an indicator of student recommendation
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'certified':
        // Show verified locations first
        filtered = filtered.sort((a, b) => {
          if (a.status === 'verified' && b.status !== 'verified') return -1;
          if (a.status !== 'verified' && b.status === 'verified') return 1;
          return 0;
        });
        break;
    }
  }

  return filtered;
};

// Function to get nearby GF locations - simple wrapper around the data function
export async function getGFLocations() {
  try {
    const restaurants = await fetchGFLocations();
    return restaurants;
  } catch (error) {
    console.error('Error fetching GF locations:', error);
    throw error;
  }
}

// Calculate distance between two coordinates (haversine formula)
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Define default map center (Singapore NTU)
export const DEFAULT_MAP_CENTER = [1.3483, 103.6831];
export const DEFAULT_MAP_ZOOM = 15;
