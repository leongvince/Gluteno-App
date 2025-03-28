import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { format, formatDistance } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
  const [meetupDialogOpen, setMeetupDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Check localStorage for tab selection on component mount
  useEffect(() => {
    const tabFromStorage = localStorage.getItem('communityTab');
    if (tabFromStorage) {
      setActiveRoom(tabFromStorage);
      // Clear the storage to avoid persisting this selection across page refreshes
      localStorage.removeItem('communityTab');
    }
  }, []);
  
  // Meetup data
  const upcomingMeetups = [
    {
      id: 1,
      title: "Gluten-Free Baking Workshop",
      date: "April 2, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Campus Kitchen (Building C)",
      attendees: 12,
      maxAttendees: 20,
      host: "Singapore Celiac Support Group"
    },
    {
      id: 2,
      title: "Dining Out Safely - Restaurant Tour",
      date: "April 8, 2025",
      time: "6:30 PM - 8:30 PM",
      location: "Meeting at South Gate",
      attendees: 8,
      maxAttendees: 15,
      host: "GF Singapore"
    },
    {
      id: 3,
      title: "New Diagnosis Support Circle",
      date: "April 15, 2025",
      time: "4:00 PM - 5:30 PM",
      location: "Student Center Room 204",
      attendees: 5,
      maxAttendees: 10,
      host: "Campus Health Services"
    }
  ];
  
  const rooms = [
    { id: 'all', name: 'All Posts' },
    { id: 'newlyDiagnosed', name: 'Newly Diagnosed' },
    { id: 'gfRecipes', name: 'GF Recipes' },
    { id: 'budgetMeals', name: 'Budget Meals' },
    { id: 'diningOut', name: 'Dining Out' },
    { id: 'meetups', name: 'Meetups' }
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
      <div className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <div className="flex space-x-2 whitespace-nowrap">
          {rooms.map(room => (
            <button 
              key={room.id}
              className={`px-3 py-1 text-sm ${activeRoom === room.id ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full`}
              onClick={() => setActiveRoom(room.id)}
            >
              {room.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Ask Question Button */}
      <div className="px-4 py-3">
        {activeRoom === 'meetups' ? (
          <button 
            className="w-full py-2 bg-primary text-white rounded-lg font-medium flex items-center justify-center"
            onClick={() => setMeetupDialogOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Join Meetup
          </button>
        ) : (
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
        )}
      </div>
      
      {/* Meetup Dialog */}
      <Dialog open={meetupDialogOpen} onOpenChange={setMeetupDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join a Meetup</DialogTitle>
            <DialogDescription>
              Connect with other gluten-free students in person
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            {upcomingMeetups.map((meetup) => (
              <div key={meetup.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <h3 className="font-medium text-gray-900 dark:text-white">{meetup.title}</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm flex items-center text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {meetup.date}
                  </p>
                  <p className="text-sm flex items-center text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {meetup.time}
                  </p>
                  <p className="text-sm flex items-center text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {meetup.location}
                  </p>
                  <p className="text-sm flex items-center text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    {meetup.attendees}/{meetup.maxAttendees} attendees
                  </p>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Hosted by: {meetup.host}</span>
                  <button 
                    className="px-3 py-1 bg-primary text-white rounded-lg text-sm"
                    onClick={() => {
                      setMeetupDialogOpen(false);
                      toast({
                        title: "Success!",
                        description: `You've joined the "${meetup.title}" meetup on ${meetup.date}`,
                      });
                    }}
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Meetups display when meetups tab is selected */}
      {activeRoom === 'meetups' && (
        <div className="px-4 py-2">
          <h3 className="text-lg font-medium mb-3 dark:text-white">Upcoming Meetups</h3>
          <div className="space-y-4">
            {upcomingMeetups.map((meetup) => (
              <div key={meetup.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h4 className="font-medium mb-2 dark:text-white">{meetup.title}</h4>
                <div className="space-y-1 mb-3">
                  <p className="text-sm flex items-center text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {meetup.date} • {meetup.time}
                  </p>
                  <p className="text-sm flex items-center text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {meetup.location}
                  </p>
                  <p className="text-sm flex items-center text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    {meetup.attendees}/{meetup.maxAttendees} attendees
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Hosted by: {meetup.host}</span>
                  <button 
                    className="px-3 py-1 bg-primary text-white rounded-lg text-sm"
                    onClick={() => {
                      toast({
                        title: "Success!",
                        description: `You've joined the "${meetup.title}" meetup on ${meetup.date}`,
                      });
                    }}
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-2 dark:text-white">Want to host a meetup?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              If you'd like to organize a gluten-free gathering or event, we can help you connect with other members.
            </p>
            <button className="w-full py-2 border border-primary text-primary dark:text-primary-foreground dark:border-primary-foreground rounded-lg font-medium"
              onClick={() => {
                toast({
                  title: "Host a Meetup",
                  description: "Meetup hosting form would appear here",
                });
              }}
            >
              Create a Meetup
            </button>
          </div>
        </div>
      )}
      
      {/* Community Posts */}
      {activeRoom !== 'meetups' && (
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
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
                  <p className="text-sm font-medium dark:text-white">{post.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatPostDate(post.createdAt)}</p>
                </div>
                {post.isVerifiedDietitian && (
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-1.5 py-0.5 rounded">Verified Dietitian</span>
                )}
              </div>
              <h3 className="font-medium mb-1 dark:text-white">{post.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {post.content}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <button 
                    className="text-gray-500 dark:text-gray-400 p-1"
                    onClick={() => handleUpvote(post.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </button>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{post.upvotes}</span>
                  <button className="text-gray-500 dark:text-gray-400 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </button>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{post.replyCount}</span>
                </div>
                <button 
                  className="px-2 py-1 text-xs text-primary dark:text-primary-foreground border border-primary dark:border-primary-foreground rounded-lg"
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
      )}
    </div>
  );
};

export default Community;
