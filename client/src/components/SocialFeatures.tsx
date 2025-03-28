import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Copy, 
  MessageCircle, 
  Heart, 
  Share2, 
  UserPlus, 
  UserMinus,
  Check,
  Send, // Telegram icon
  Phone // WhatsApp icon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  name: string;
  username: string;
  avatarUrl: string;
  isFollowing: boolean;
}

interface SocialFeaturesProps {
  recipeId?: number;
  recipeName?: string;
  recipeImage?: string;
}

const SocialFeatures: React.FC<SocialFeaturesProps> = ({ recipeId, recipeName, recipeImage }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('followers');
  const [followers, setFollowers] = useState<User[]>([
    { id: 1, name: 'Emma Wilson', username: '@emma_w', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', isFollowing: true },
    { id: 2, name: 'Alex Chen', username: '@alexc', avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36', isFollowing: false },
    { id: 3, name: 'Taylor Kim', username: '@taylor_k', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956', isFollowing: true },
    { id: 4, name: 'Morgan Smith', username: '@morgansmith', avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d', isFollowing: false },
  ]);
  
  const [following, setFollowing] = useState<User[]>([
    { id: 1, name: 'Emma Wilson', username: '@emma_w', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', isFollowing: true },
    { id: 5, name: 'Jordan Lee', username: '@jlee', avatarUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e', isFollowing: true },
    { id: 6, name: 'Sam Richards', username: '@sam_r', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde', isFollowing: true },
  ]);
  
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const toggleFollow = (userId: number) => {
    // Update followers
    setFollowers(followers.map(follower => 
      follower.id === userId 
        ? { ...follower, isFollowing: !follower.isFollowing } 
        : follower
    ));
    
    // Update following
    setFollowing(following.map(user => 
      user.id === userId 
        ? { ...user, isFollowing: !user.isFollowing } 
        : user
    ));
    
    // Show toast
    const userToUpdate = [...followers, ...following].find(user => user.id === userId);
    if (userToUpdate) {
      toast({
        title: userToUpdate.isFollowing ? `Unfollowed ${userToUpdate.name}` : `Following ${userToUpdate.name}`,
        description: userToUpdate.isFollowing ? "You'll no longer see their updates" : "You'll now see their updates in your feed",
      });
    }
  };

  const shareToSocial = (platform: string) => {
    let shareUrl = window.location.href;
    let shareText = `Check out this delicious gluten-free recipe: ${recipeName}`;
    let url = '';

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl).then(() => {
          setIsLinkCopied(true);
          setTimeout(() => setIsLinkCopied(false), 2000);
        });
        toast({
          title: "Link copied!",
          description: "Share it with your friends via message or email",
        });
        return;
      default:
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      toast({
        title: `Sharing to ${platform}`,
        description: "A new window has opened for you to complete sharing",
      });
    }
  };

  return (
    <div className="py-4">
      <Tabs defaultValue="followers" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="followers" className="text-xs sm:text-sm">Followers ({followers.length})</TabsTrigger>
          <TabsTrigger value="following" className="text-xs sm:text-sm">Following ({following.length})</TabsTrigger>
          <TabsTrigger value="share" className="text-xs sm:text-sm">Share</TabsTrigger>
        </TabsList>
        
        <TabsContent value="followers" className="mt-4">
          <Card>
            <CardContent className="p-4">
              {followers.length > 0 ? (
                <div className="space-y-4">
                  {followers.map((follower) => (
                    <div key={follower.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={follower.avatarUrl} />
                          <AvatarFallback>{follower.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{follower.name}</p>
                          <p className="text-xs text-muted-foreground">{follower.username}</p>
                        </div>
                      </div>
                      <Button 
                        variant={follower.isFollowing ? "outline" : "default"} 
                        size="sm"
                        onClick={() => toggleFollow(follower.id)}
                      >
                        {follower.isFollowing ? (
                          <>
                            <UserMinus className="mr-1 h-4 w-4" />
                            Unfollow
                          </>
                        ) : (
                          <>
                            <UserPlus className="mr-1 h-4 w-4" />
                            Follow
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No followers yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="following" className="mt-4">
          <Card>
            <CardContent className="p-4">
              {following.length > 0 ? (
                <div className="space-y-4">
                  {following.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.username}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleFollow(user.id)}
                      >
                        <UserMinus className="mr-1 h-4 w-4" />
                        Unfollow
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You're not following anyone yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="share" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Share {recipeName || "this recipe"}</h3>
                <p className="text-sm text-muted-foreground">Let others know about this gluten-free recipe</p>
              </div>
              
              {recipeImage && (
                <div className="mb-4 aspect-video relative rounded-md overflow-hidden">
                  <img src={recipeImage} alt={recipeName} className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="grid grid-cols-4 gap-2">
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center p-3 h-auto"
                  onClick={() => shareToSocial('facebook')}
                >
                  <Facebook className="h-6 w-6 text-blue-600" />
                  <span className="mt-1 text-xs">Facebook</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center p-3 h-auto"
                  onClick={() => shareToSocial('twitter')}
                >
                  <Twitter className="h-6 w-6 text-sky-500" />
                  <span className="mt-1 text-xs">Twitter</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center p-3 h-auto"
                  onClick={() => shareToSocial('telegram')}
                >
                  <Send className="h-6 w-6 text-blue-500" />
                  <span className="mt-1 text-xs">Telegram</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center p-3 h-auto"
                  onClick={() => shareToSocial('whatsapp')}
                >
                  <Phone className="h-6 w-6 text-green-600" />
                  <span className="mt-1 text-xs">WhatsApp</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center p-3 h-auto col-span-4 mt-2"
                  onClick={() => shareToSocial('copy')}
                >
                  {isLinkCopied ? (
                    <Check className="h-6 w-6 text-green-500" />
                  ) : (
                    <Copy className="h-6 w-6 text-gray-500" />
                  )}
                  <span className="mt-1 text-xs">{isLinkCopied ? 'Copied!' : 'Copy Link'}</span>
                </Button>
              </div>
              
              <div className="mt-4 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center"
                >
                  <MessageCircle className="mr-1 h-4 w-4" />
                  <span>Comment</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center"
                >
                  <Heart className="mr-1 h-4 w-4" />
                  <span>Like</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center"
                >
                  <Share2 className="mr-1 h-4 w-4" />
                  <span>Recommend</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialFeatures;