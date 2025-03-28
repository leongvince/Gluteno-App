import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getGFLocations } from '@/lib/mapUtils';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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



// Center on Singapore NTU campus
const DEFAULT_CENTER = [1.3483, 103.6831];
const DEFAULT_ZOOM = 15;

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

const GFRadar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('student');
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
    setActiveFilter(filter === activeFilter ? '' : filter);
  };

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
      
      {/* Filters */}
      <div className="px-4 py-2 flex space-x-2 overflow-x-auto bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <button 
          className={`px-3 py-1 text-sm ${activeFilter === 'price' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleFilterClick('price')}
        >
          Price 💲
        </button>
        <button 
          className={`px-3 py-1 text-sm ${activeFilter === 'distance' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleFilterClick('distance')}
        >
          Distance 📍
        </button>
        <button 
          className={`px-3 py-1 text-sm ${activeFilter === 'student' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleFilterClick('student')}
        >
          Student Recommended ⭐
        </button>
        <button 
          className={`px-3 py-1 text-sm ${activeFilter === 'certified' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full whitespace-nowrap`}
          onClick={() => handleFilterClick('certified')}
        >
          Certified GF ✓
        </button>
      </div>
      
      {/* Map View */}
      <div className="relative h-64 w-full">
        <MapContainer 
          center={DEFAULT_CENTER as [number, number]} 
          zoom={DEFAULT_ZOOM} 
          className="h-full w-full z-0"
          whenCreated={(map) => { mapRef.current = map; }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {restaurants?.map((restaurant) => (
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
        ) : restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
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
        
        {restaurants && restaurants.length > 0 && (
          <button className="w-full py-2 text-primary dark:text-primary-foreground text-center text-sm font-medium">
            Load More Results
          </button>
        )}
      </div>
    </div>
  );
};

export default GFRadar;
