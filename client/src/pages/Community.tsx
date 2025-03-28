import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { format, formatDistance } from 'date-fns';

interface CommunityPost {
  id: number;
  userId: number | null;
  username: string;
  isAnonymous: boolean;
  avatarUrl: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  upvotes: number;
  replyCount: number;
  isVerifiedDietitian?: boolean;
}

const Community: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const rooms = [
    { id: 'all', name: 'All Posts' },
    { id: 'newlyDiagnosed', name: 'Newly Diagnosed' },
    { id: 'gfRecipes', name: 'GF Recipes' },
    { id: 'budgetMeals', name: 'Budget Meals' },
    { id: 'diningOut', name: 'Dining Out' }
  ];
  
  const { data: posts, isLoading } = useQuery({
    queryKey: [`/api/community-posts`, activeRoom],
    queryFn: async () => {
      // This would normally fetch from the backend
      // For now, return some sample data
      return [
        {
          id: 1,
          userId: null,
          username: 'Anonymous Student',
          isAnonymous: true,
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80',
          title: 'Can I eat mala hotpot safely?',
          content: "I've been craving mala hotpot but I'm worried about cross-contamination. Has anyone found a safe place near campus?",
          category: 'diningOut',
          createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          upvotes: 12,
          replyCount: 5
        },
        {
          id: 2,
          userId: 3,
          username: 'ChrisW',
          isAnonymous: false,
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80',
          title: 'Easy 5-minute breakfast ideas for busy mornings',
          content: "Here are some quick gluten-free breakfast ideas when you're rushing to morning classes...",
          category: 'gfRecipes',
          createdAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
          upvotes: 24,
          replyCount: 8,
          isVerifiedDietitian: true
        }
      ] as CommunityPost[];
    }
  });
  
  const upvoteMutation = useMutation({
    mutationFn: async (postId: number) => {
      return await apiRequest('POST', `/api/community-posts/${postId}/upvote`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/community-posts`] });
    }
  });
  
  const handleUpvote = (postId: number) => {
    upvoteMutation.mutate(postId);
  };
  
  const handleAskQuestion = () => {
    toast({
      title: "Ask a Question",
      description: "Question form would open in a modal",
    });
  };
  
  const handleReply = (postId: number) => {
    toast({
      title: "Reply to Post",
      description: "Reply form would open in a modal",
    });
  };
  
  // Format the date/time nicely
  const formatPostDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${formatDistance(date, new Date())} ago • ${posts?.find(p => p.createdAt === dateStr)?.category || 'General'}`;
  };

  return (
    <div className="pb-16">
      <div className="px-4 py-3 bg-primary text-white sticky top-0 z-10">
        <h2 className="text-lg font-medium">Community</h2>
        <p className="text-sm opacity-90">Connect with others & get support</p>
      </div>
      
      {/* Community Rooms */}
      <div className="px-4 py-3 bg-white border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-2 whitespace-nowrap">
          {rooms.map(room => (
            <button 
              key={room.id}
              className={`px-3 py-1 text-sm ${activeRoom === room.id ? 'bg-primary text-white' : 'bg-gray-100'} rounded-full`}
              onClick={() => setActiveRoom(room.id)}
            >
              {room.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Ask Question Button */}
      <div className="px-4 py-3">
        <button 
          className="w-full py-2 bg-primary text-white rounded-lg font-medium flex items-center justify-center"
          onClick={handleAskQuestion}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Ask Question Anonymously
        </button>
      </div>
      
      {/* Community Posts */}
      <div className="px-4 py-2">
        {isLoading ? (
          // Skeleton loading state
          Array(2).fill(null).map((_, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 mb-4 animate-pulse">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-6 w-6 bg-gray-200 rounded-full mr-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-6 mr-3"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded-full mr-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-6"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))
        ) : posts && posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                  <img 
                    src={post.avatarUrl} 
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50x50?text=User';
                    }}
                  />
                </div>
                <div className="ml-2 flex-1">
                  <p className="text-sm font-medium">{post.username}</p>
                  <p className="text-xs text-gray-500">{formatPostDate(post.createdAt)}</p>
                </div>
                {post.isVerifiedDietitian && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Verified Dietitian</span>
                )}
              </div>
              <h3 className="font-medium mb-1">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {post.content}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <button 
                    className="text-gray-500 p-1"
                    onClick={() => handleUpvote(post.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </button>
                  <span className="text-xs text-gray-500 mr-2">{post.upvotes}</span>
                  <button className="text-gray-500 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </button>
                  <span className="text-xs text-gray-500">{post.replyCount}</span>
                </div>
                <button 
                  className="px-2 py-1 text-xs text-primary border border-primary rounded-lg"
                  onClick={() => handleReply(post.id)}
                >
                  Reply
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-sm text-gray-500">No posts found in this category.</p>
            <p className="text-xs text-gray-400 mt-1">Be the first to start a conversation!</p>
          </div>
        )}
        
        {posts && posts.length > 0 && (
          <button className="w-full py-2 text-primary text-center text-sm font-medium">
            Load More Posts
          </button>
        )}
      </div>
    </div>
  );
};

export default Community;
