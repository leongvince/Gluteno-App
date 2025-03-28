import React from 'react';
import { Link } from 'wouter';
import { ThemeToggle } from '@/components/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="px-4 py-3 bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-semibold text-primary cursor-pointer dark:text-primary-foreground">Gluteno</h1>
        </Link>
        <div className="flex items-center space-x-1">
          <ThemeToggle className="mr-1" />
          
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
