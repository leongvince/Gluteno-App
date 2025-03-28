import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface DailySummaryProps {
  userId: number;
}

interface SummaryData {
  mood: string;
  mealCount: number;
  totalMeals: number;
  symptomLevel: string;
}

const DailySummary: React.FC<DailySummaryProps> = ({ userId }) => {
  const today = new Date().toISOString().split('T')[0];
  
  const { data: summaryData, isLoading } = useQuery({
    queryKey: [`/api/health-logs/user/${userId}/date/${today}`],
    queryFn: async () => {
      // This would normally come from the backend, but for now we'll return some mock data
      return {
        mood: 'good',
        mealCount: 2,
        totalMeals: 3,
        symptomLevel: 'minimal'
      } as SummaryData;
    }
  });

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'great':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        );
      case 'good':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        );
      case 'okay':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="15" x2="16" y2="15"></line>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="15" x2="16" y2="15"></line>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        );
    }
  };

  return (
    <section className="px-4 mb-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-medium text-gray-800 mb-3">Today's Summary</h3>
        {isLoading ? (
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-50 rounded p-2 animate-pulse">
              <div className="h-6 w-6 mx-auto bg-gray-200 rounded-full"></div>
              <div className="h-4 w-12 mx-auto mt-1 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 mx-auto mt-1 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-gray-50 rounded p-2 animate-pulse">
              <div className="h-6 w-6 mx-auto bg-gray-200 rounded-full"></div>
              <div className="h-4 w-12 mx-auto mt-1 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 mx-auto mt-1 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-gray-50 rounded p-2 animate-pulse">
              <div className="h-6 w-6 mx-auto bg-gray-200 rounded-full"></div>
              <div className="h-4 w-12 mx-auto mt-1 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 mx-auto mt-1 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-50 rounded p-2">
              {getMoodIcon(summaryData?.mood || 'okay')}
              <p className="text-xs mt-1">Mood</p>
              <p className="text-sm font-medium capitalize">{summaryData?.mood || 'Okay'}</p>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
              <p className="text-xs mt-1">Meals</p>
              <p className="text-sm font-medium">{summaryData?.mealCount || 0}/{summaryData?.totalMeals || 3} GF</p>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              <p className="text-xs mt-1">Symptoms</p>
              <p className="text-sm font-medium capitalize">{summaryData?.symptomLevel || 'None'}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailySummary;
