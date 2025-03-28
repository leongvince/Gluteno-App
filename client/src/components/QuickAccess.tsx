import React from 'react';
import { Link } from 'wouter';

interface QuickLink {
  title: string;
  icon: JSX.Element;
  path: string;
  onClick?: () => void;
}

const QuickAccess: React.FC = () => {
  const quickLinks: QuickLink[] = [
    {
      title: "Find GF Eats Nearby",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary text-2xl mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      path: "/gf-radar"
    },
    {
      title: "GF 101",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary text-2xl mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      path: "/learn-zone"
    },
    {
      title: "Join a Meetup",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary text-2xl mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      path: "/community",
      onClick: () => {
        // Store the meetup tab selection in localStorage
        localStorage.setItem('communityTab', 'meetups');
      }
    },
    {
      title: "Ask the Community",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary text-2xl mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      path: "/community"
    }
  ];

  return (
    <section className="px-4 mb-6">
      <h3 className="font-medium text-gray-800 dark:text-white mb-3">Quick Access</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickLinks.map((link, index) => (
          <Link 
            key={index} 
            href={link.path} 
            onClick={link.onClick}
            className="quick-link-card bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 flex flex-col items-center justify-center hover:border-primary transition duration-200"
          >
            <div>
              {link.icon}
              <p className="text-sm font-medium text-center text-gray-700 dark:text-white">{link.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickAccess;
