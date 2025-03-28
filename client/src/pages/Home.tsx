import React from 'react';
import DailyTip from '@/components/DailyTip';
import DailySummary from '@/components/DailySummary';
import QuickAccess from '@/components/QuickAccess';
import { useQuery } from '@tanstack/react-query';

interface RecentActivity {
  id: number;
  type: string;
  title: string;
  timestamp: string;
  icon: string;
}

const Home: React.FC = () => {
  // Assume user ID 1 for demo purposes
  const userId = 1;

  const { data: recentActivities, isLoading } = useQuery({
    queryKey: ['/api/recent-activities'],
    queryFn: async () => {
      // This would normally fetch from an API, but for now we'll return some sample data
      return [
        {
          id: 1,
          type: 'location',
          title: 'You saved "GF Bakery @ Downtown"',
          timestamp: 'Today, 2:15 PM',
          icon: 'place'
        },
        {
          id: 2,
          type: 'recipe',
          title: 'You marked "Quinoa Bowl" as favorite',
          timestamp: 'Yesterday, 7:30 PM',
          icon: 'restaurant_menu'
        }
      ] as RecentActivity[];
    }
  });

  // Map activity icon to SVG component
  const getActivityIcon = (icon: string) => {
    switch(icon) {
      case 'place':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        );
      case 'restaurant_menu':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  };

  return (
    <div className="pb-16">
      <DailyTip />
      <DailySummary userId={userId} />
      <QuickAccess />
      
      {/* Recent Activity */}
      <section className="px-4 mb-6">
        <h3 className="font-medium text-gray-800 dark:text-white mb-3">Recent Activity</h3>
        
        {isLoading ? (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-3 animate-pulse">
              <div className="flex items-start">
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-3 animate-pulse">
              <div className="flex items-start">
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </>
        ) : recentActivities && recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
            <div key={activity.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-3">
              <div className="flex items-start">
                {getActivityIcon(activity.icon)}
                <div>
                  <p className="text-sm font-medium dark:text-white">{activity.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-300">No recent activity to display</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
