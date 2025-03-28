import React from 'react';
import { useTodayTip } from '@/data/dailyTips';

const DailyTip: React.FC = () => {
  const { tip, isLoading } = useTodayTip();

  return (
    <section className="px-4 pt-4">
      <div className="rounded-lg bg-indigo-50 p-4 mb-4">
        <div className="flex items-start">
          <div className="flex-1">
            <p className="text-sm text-gray-600">Hey Amanda,</p>
            <h2 className="font-semibold text-lg">Here's today's GF tip 🍞❌</h2>
            {isLoading ? (
              <p className="mt-2 text-sm animate-pulse">Loading today's tip...</p>
            ) : (
              <p className="mt-2 text-sm">{tip}</p>
            )}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default DailyTip;
