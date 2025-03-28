import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface LearnTopic {
  id: number;
  title: string;
  description: string;
  icon: string;
  action: string;
  actionLabel: string;
}

interface VideoStory {
  id: number;
  title: string;
  thumbnailUrl: string;
  duration: string;
}

const LearnZone: React.FC = () => {
  const { toast } = useToast();
  
  const { data: topics, isLoading: topicsLoading } = useQuery({
    queryKey: ['/api/learn-topics'],
    queryFn: async () => {
      // This would normally fetch from the backend
      return [
        {
          id: 1,
          title: "What is Celiac Disease?",
          description: "An autoimmune disorder where gluten damages the small intestine.",
          icon: "science",
          action: "learn-more",
          actionLabel: "Learn more"
        },
        {
          id: 2,
          title: "Hidden Gluten Checklist",
          description: "Surprising places gluten might be hiding in your food.",
          icon: "checklist",
          action: "see-checklist",
          actionLabel: "See checklist"
        },
        {
          id: 3,
          title: "Eating Out Tips",
          description: "How to safely navigate restaurants and campus dining.",
          icon: "restaurant",
          action: "read-tips",
          actionLabel: "Read tips"
        },
        {
          id: 4,
          title: "Supermarket Survival Guide",
          description: "Finding affordable gluten-free options at local stores.",
          icon: "shopping_cart",
          action: "get-guide",
          actionLabel: "Get the guide"
        }
      ] as LearnTopic[];
    }
  });
  
  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ['/api/student-stories'],
    queryFn: async () => {
      // This would normally fetch from the backend
      return [
        {
          id: 1,
          title: "My First Year with Celiac",
          thumbnailUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=320&h=180&fit=crop",
          duration: "3:45"
        },
        {
          id: 2,
          title: "Dorm Cooking Hacks",
          thumbnailUrl: "https://images.unsplash.com/photo-1541855492-581f618f69a0?w=320&h=180&fit=crop",
          duration: "5:12"
        }
      ] as VideoStory[];
    }
  });
  
  const handleTopicClick = (topic: LearnTopic) => {
    // In a real app, this would navigate to the specific content page
    toast({
      title: `${topic.title}`,
      description: "This content would open in a dedicated page.",
    });
  };
  
  const handleVideoClick = (video: VideoStory) => {
    toast({
      title: `Playing: ${video.title}`,
      description: "Video would play in a modal or dedicated page.",
    });
  };
  
  // Get icon component based on icon name
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'science':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary text-2xl mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
          </svg>
        );
      case 'checklist':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary text-2xl mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        );
      case 'restaurant':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary text-2xl mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
        );
      case 'shopping_cart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary text-2xl mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        );
      case 'play_circle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary text-2xl mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary text-2xl mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  };

  return (
    <div className="pb-16">
      <div className="px-4 py-3 bg-primary text-white sticky top-0 z-10">
        <h2 className="text-lg font-medium">GF 101</h2>
        <p className="text-sm opacity-90">Learn about going gluten-free</p>
      </div>
      
      {/* Learn Zone Cards */}
      <div className="px-4 pt-4">
        {topicsLoading ? (
          // Skeleton loading state
          Array(4).fill(null).map((_, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 mb-4 animate-pulse">
              <div className="flex items-start">
                <div className="h-10 w-10 bg-gray-200 rounded mr-3"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Actual content
          topics?.map((topic) => (
            <div key={topic.id} className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <div className="flex items-start">
                {getIcon(topic.icon)}
                <div>
                  <h3 className="font-medium">{topic.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                  <button 
                    className="mt-2 text-sm text-primary font-medium flex items-center"
                    onClick={() => handleTopicClick(topic)}
                  >
                    {topic.actionLabel} 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Student Stories */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <div className="flex items-start">
            {getIcon('play_circle')}
            <div>
              <h3 className="font-medium">Student Stories</h3>
              <p className="text-sm text-gray-600 mt-1">Video testimonials from other students managing celiac.</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {videosLoading ? (
                  // Skeleton loading for videos
                  Array(2).fill(null).map((_, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden h-24 bg-gray-200 animate-pulse">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                      </div>
                    </div>
                  ))
                ) : (
                  // Actual video thumbnails
                  videos?.map((video) => (
                    <div 
                      key={video.id} 
                      className="relative rounded-lg overflow-hidden h-24 bg-gray-200 cursor-pointer"
                      onClick={() => handleVideoClick(video)}
                    >
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/180x100?text=Video';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnZone;
