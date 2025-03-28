import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getGFLocations, DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '@/lib/mapUtils';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Fix Leaflet marker icon issue
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

// Custom marker icons for different statuses
const verifiedIcon = L.divIcon({
  className: 'custom-pin pin-verified',
  html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const checkIcon = L.divIcon({
  className: 'custom-pin pin-check',
  html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});



// Default constants are imported from mapUtils.ts

interface Restaurant {
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

type SortOption = 'recommended' | 'rating' | 'distance' | 'deliveryTime';

const GFRadar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSubFilter, setActiveSubFilter] = useState('');
  const [activeSortOption, setActiveSortOption] = useState<SortOption>('recommended');
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [showPromo, setShowPromo] = useState(false);
  const [activePriceFilter, setActivePriceFilter] = useState<string[]>([]);
  const mapRef = useRef<L.Map | null>(null);

  const { data: restaurants, isLoading } = useQuery({
    queryKey: ['/api/gf-locations'],
    queryFn: getGFLocations
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return verifiedIcon;
      case 'check':
        return checkIcon;
      default:
        return defaultIcon;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="ml-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-1.5 py-0.5 rounded">Verified</span>
        );
      case 'check':
        return (
          <span className="ml-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 px-1.5 py-0.5 rounded">Check with staff</span>
        );
      default:
        return null;
    }
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter === activeFilter ? 'all' : filter);
  };
  
  const handleSubFilterClick = (filter: string) => {
    setActiveSubFilter(filter === activeSubFilter ? '' : filter);
  };
  
  useEffect(() => {
    // Set initial filtered restaurants when data is loaded
    if (restaurants) {
      setFilteredRestaurants(restaurants);
    }
  }, [restaurants]);
  
  // Apply filters whenever they change
  useEffect(() => {
    if (!restaurants) return;
    
    let results = [...restaurants];
    
    // Apply main cuisine filter
    if (activeFilter !== 'all') {
      results = results.filter(restaurant => {
        const cuisine = restaurant.cuisine.toLowerCase();
        switch(activeFilter) {
          case 'drinks':
            return cuisine.includes('cafe') || cuisine.includes('tea') || cuisine.includes('juice') || cuisine.includes('coffee');
          case 'bakery':
            return cuisine.includes('bakery') || cuisine.includes('cake') || cuisine.includes('pastry') || cuisine.includes('dessert');
          case 'local':
            return cuisine.includes('hawker') || cuisine.includes('local') || cuisine.includes('singaporean') || cuisine.includes('malaysian');
          case 'burgers':
            return cuisine.includes('burger') || cuisine.includes('fast food');
          case 'breakfast':
            return cuisine.includes('breakfast') || cuisine.includes('brunch');
          case 'noodles':
            return cuisine.includes('noodle') || cuisine.includes('pasta') || cuisine.includes('ramen');
          default:
            return true;
        }
      });
    }
    
    // Apply price filters
    if (activePriceFilter.length > 0) {
      results = results.filter(restaurant => 
        activePriceFilter.includes(restaurant.priceRange)
      );
    }
    
    // Apply promo filter
    if (showPromo) {
      // This would filter to only show restaurants with active promotions
      // For demo, we'll just show random restaurants as having promos
      results = results.filter((_, index) => index % 3 === 0);
    }
    
    // Apply sub-filters
    if (activeSubFilter) {
      switch (activeSubFilter) {
        case 'nearme':
          // Sort by distance
          results = [...results].sort((a, b) => {
            const distA = parseFloat(a.distance.replace('km', '').trim());
            const distB = parseFloat(b.distance.replace('km', '').trim());
            return distA - distB;
          });
          break;
        case 'budget':
          // Filter by price ($ or $$)
          results = results.filter(r => r.priceRange === '$' || r.priceRange === '$$');
          break;
        case 'student':
          // Sort by rating for student recommended places
          results = [...results].sort((a, b) => b.rating - a.rating);
          break;
        case 'certified':
          // Filter only verified places
          results = results.filter(r => r.status === 'verified');
          break;
      }
    }
    
    // Apply sort options
    switch (activeSortOption) {
      case 'recommended':
        // For demo purposes, we'll just keep the default order
        // In a real app, this would use a recommendation algorithm
        break;
      case 'rating':
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        results = [...results].sort((a, b) => {
          const distA = parseFloat(a.distance.replace('km', '').trim());
          const distB = parseFloat(b.distance.replace('km', '').trim());
          return distA - distB;
        });
        break;
      case 'deliveryTime':
        // For demo purposes, we'll simulate delivery time based on distance
        results = [...results].sort((a, b) => {
          const distA = parseFloat(a.distance.replace('km', '').trim());
          const distB = parseFloat(b.distance.replace('km', '').trim());
          return distA - distB;
        });
        break;
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query) || 
        restaurant.cuisine.toLowerCase().includes(query)
      );
    }
    
    setFilteredRestaurants(results);
  }, [restaurants, activeFilter, activeSubFilter, activeSortOption, activePriceFilter, showPromo, searchQuery]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300 dark:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="pb-16">
      <div className="px-4 py-3 bg-primary text-white sticky top-0 z-10">
        <h2 className="text-lg font-medium">GF Radar Map</h2>
        <p className="text-sm opacity-90">Find gluten-free options near you</p>
      </div>
      
      {/* Search Bar */}
      <div className="px-4 py-3 bg-white dark:bg-gray-800 shadow-sm">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Gluten-Free Nasi Lemak near NTU" 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Cuisine Filters */}
      <div className="px-4 py-2 flex space-x-2 overflow-x-auto bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <button 
          className={`px-3 py-1 text-sm ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleFilterClick('all')}
        >
          All
        </button>
        <button 
          className={`px-3 py-1 text-sm ${activeFilter === 'drinks' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleFilterClick('drinks')}
        >
          Drinks 🥤
        </button>
        <button 
          className={`px-3 py-1 text-sm ${activeFilter === 'bakery' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleFilterClick('bakery')}
        >
          Bakery & Cake 🍰
        </button>
        <button 
          className={`px-3 py-1 text-sm ${activeFilter === 'local' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleFilterClick('local')}
        >
          Local Food 🍜
        </button>
        <button 
          className={`px-3 py-1 text-sm ${activeFilter === 'burgers' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleFilterClick('burgers')}
        >
          Burgers 🍔
        </button>
        <button 
          className={`px-3 py-1 text-sm ${activeFilter === 'breakfast' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleFilterClick('breakfast')}
        >
          Breakfast 🍳
        </button>
        <button 
          className={`px-3 py-1 text-sm ${activeFilter === 'noodles' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleFilterClick('noodles')}
        >
          Noodles 🍜
        </button>
      </div>
      
      {/* Sub Filters */}
      <div className="px-4 py-2 flex space-x-2 overflow-x-auto bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Dialog>
          <DialogTrigger asChild>
            <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full whitespace-nowrap flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Sort By
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Sort By</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 py-2">
              <button 
                className="flex items-center w-full px-3 py-3 text-left border-b border-gray-100 dark:border-gray-700"
                onClick={() => {
                  setActiveSortOption('recommended');
                  const closeButton = document.querySelector('[data-close-dialog]') as HTMLButtonElement;
                  if (closeButton) closeButton.click();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                <span>Recommended</span>
                {activeSortOption === 'recommended' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="16 12 12 8 8 12"></polyline>
                    <line x1="12" y1="16" x2="12" y2="8"></line>
                  </svg>
                )}
              </button>
              <button 
                className="flex items-center w-full px-3 py-3 text-left border-b border-gray-100 dark:border-gray-700"
                onClick={() => {
                  setActiveSortOption('rating');
                  const closeButton = document.querySelector('[data-close-dialog]') as HTMLButtonElement;
                  if (closeButton) closeButton.click();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>Rating</span>
                {activeSortOption === 'rating' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="16 12 12 8 8 12"></polyline>
                    <line x1="12" y1="16" x2="12" y2="8"></line>
                  </svg>
                )}
              </button>
              <button 
                className="flex items-center w-full px-3 py-3 text-left border-b border-gray-100 dark:border-gray-700"
                onClick={() => {
                  setActiveSortOption('distance');
                  const closeButton = document.querySelector('[data-close-dialog]') as HTMLButtonElement;
                  if (closeButton) closeButton.click();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Distance</span>
                {activeSortOption === 'distance' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="16 12 12 8 8 12"></polyline>
                    <line x1="12" y1="16" x2="12" y2="8"></line>
                  </svg>
                )}
              </button>
              <button 
                className="flex items-center w-full px-3 py-3 text-left"
                onClick={() => {
                  setActiveSortOption('deliveryTime');
                  const closeButton = document.querySelector('[data-close-dialog]') as HTMLButtonElement;
                  if (closeButton) closeButton.click();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Delivery time</span>
                {activeSortOption === 'deliveryTime' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="16 12 12 8 8 12"></polyline>
                    <line x1="12" y1="16" x2="12" y2="8"></line>
                  </svg>
                )}
              </button>
            </div>
            
            <div className="mt-3">
              <h4 className="text-base font-medium mb-2">Restaurant options</h4>
              <div className="flex items-center justify-between py-2 px-1">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                  <span>Promo</span>
                </div>
                <input 
                  type="checkbox" 
                  className="toggle toggle-primary" 
                  checked={showPromo}
                  onChange={() => setShowPromo(!showPromo)}
                />
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="text-base font-medium mb-2">Price</h4>
              <div className="flex items-center space-x-2">
                {['$', '$$', '$$$', '$$$$'].map((price) => (
                  <button
                    key={price}
                    className={`flex-1 py-2 px-4 rounded-full border ${
                      activePriceFilter.includes(price)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                    }`}
                    onClick={() => {
                      if (activePriceFilter.includes(price)) {
                        setActivePriceFilter(activePriceFilter.filter(p => p !== price));
                      } else {
                        setActivePriceFilter([...activePriceFilter, price]);
                      }
                    }}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <button 
          className={`px-3 py-1 text-sm ${activeSubFilter === 'nearme' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleSubFilterClick('nearme')}
        >
          Near Me 📍
        </button>
        <button 
          className={`px-3 py-1 text-sm ${activeSubFilter === 'budget' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleSubFilterClick('budget')}
        >
          Budget Meals 💰
        </button>
        <button 
          className={`px-3 py-1 text-sm ${activeSubFilter === 'student' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleSubFilterClick('student')}
        >
          Student Approved ⭐
        </button>
        <button 
          className={`px-3 py-1 text-sm ${activeSubFilter === 'certified' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleSubFilterClick('certified')}
        >
          Certified GF ✓
        </button>
      </div>
      
      {/* Map View */}
      <div className="relative h-64 w-full">
        <MapContainer 
          center={DEFAULT_MAP_CENTER as [number, number]} 
          zoom={DEFAULT_MAP_ZOOM} 
          className="h-full w-full z-0"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredRestaurants?.map((restaurant) => (
            <Marker 
              key={restaurant.id} 
              position={[restaurant.lat, restaurant.lng]}
              icon={getStatusIcon(restaurant.status)}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-medium">{restaurant.name}</h3>
                  <p>{restaurant.cuisine} • {restaurant.priceRange}</p>
                  <p className="text-green-600 text-xs mt-1">{restaurant.gfOption}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Map Legend */}
        <div className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md text-xs dark:text-white">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span>Verified GF</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
            <span>Check with staff</span>
          </div>
        </div>
        
        {/* Map Controls */}
        <div className="absolute bottom-2 right-2 flex flex-col space-y-2">
          <button 
            className="w-8 h-8 bg-white dark:bg-gray-800 dark:text-white rounded-full shadow-md flex items-center justify-center"
            onClick={() => mapRef.current?.zoomIn()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <button 
            className="w-8 h-8 bg-white dark:bg-gray-800 dark:text-white rounded-full shadow-md flex items-center justify-center"
            onClick={() => mapRef.current?.zoomOut()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <button 
            className="w-8 h-8 bg-white dark:bg-gray-800 dark:text-white rounded-full shadow-md flex items-center justify-center"
            onClick={() => navigator.geolocation.getCurrentPosition(
              (position) => {
                mapRef.current?.setView(
                  [position.coords.latitude, position.coords.longitude],
                  15
                );
              },
              (error) => {
                console.error('Error getting location:', error);
              }
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="22" y1="12" x2="18" y2="12"></line>
              <line x1="6" y1="12" x2="2" y2="12"></line>
              <line x1="12" y1="6" x2="12" y2="2"></line>
              <line x1="12" y1="22" x2="12" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Restaurant List */}
      <div className="px-4 py-3">
        <h3 className="font-medium text-gray-800 dark:text-white mb-3">Nearby Gluten-Free Options</h3>
        
        {isLoading ? (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-3 animate-pulse">
              <div className="flex">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-3 animate-pulse">
              <div className="flex">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </>
        ) : filteredRestaurants && filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-3">
              <div className="flex">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mr-3 overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={`${restaurant.name} food`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=No+Image';
                    }} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h4 className="font-medium text-sm dark:text-white">{restaurant.name}</h4>
                    {getStatusBadge(restaurant.status)}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-300">{restaurant.distance} • {restaurant.priceRange} • {restaurant.cuisine}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {renderStars(restaurant.rating)}
                    </div>
                    <span className="text-xs ml-1 text-gray-500 dark:text-gray-300">({restaurant.reviewCount})</span>
                  </div>
                  <div className="text-xs mt-1 text-green-600 dark:text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {restaurant.gfOption}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-300">No gluten-free restaurants found nearby.</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
        
        {filteredRestaurants && filteredRestaurants.length > 0 && (
          <button className="w-full py-2 text-primary dark:text-primary-foreground text-center text-sm font-medium">
            Load More Results
          </button>
        )}
      </div>
    </div>
  );
};

export default GFRadar;
