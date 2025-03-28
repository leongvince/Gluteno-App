import { 
  users, type User, type InsertUser,
  healthLogs, type HealthLog, type InsertHealthLog,
  mealLogs, type MealLog, type InsertMealLog,
  communityPosts, type CommunityPost, type InsertCommunityPost,
  postReplies, type PostReply, type InsertPostReply
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Health log operations
  createHealthLog(log: InsertHealthLog): Promise<HealthLog>;
  getHealthLogsByUserId(userId: number): Promise<HealthLog[]>;
  getHealthLogsByDate(userId: number, date: Date): Promise<HealthLog | undefined>;
  
  // Meal log operations
  createMealLog(log: InsertMealLog): Promise<MealLog>;
  getMealLogsByUserId(userId: number): Promise<MealLog[]>;
  getMealLogsByDate(userId: number, date: Date): Promise<MealLog[]>;
  updateMealLog(id: number, log: Partial<InsertMealLog>): Promise<MealLog | undefined>;
  deleteMealLog(id: number): Promise<boolean>;
  
  // Community posts operations
  createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost>;
  getCommunityPosts(category?: string): Promise<CommunityPost[]>;
  getCommunityPostById(id: number): Promise<CommunityPost | undefined>;
  upvotePost(id: number): Promise<CommunityPost | undefined>;
  
  // Post replies operations
  createPostReply(reply: InsertPostReply): Promise<PostReply>;
  getPostRepliesByPostId(postId: number): Promise<PostReply[]>;
  upvoteReply(id: number): Promise<PostReply | undefined>;
}

// In-memory implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private healthLogs: Map<number, HealthLog>;
  private mealLogs: Map<number, MealLog>;
  private communityPosts: Map<number, CommunityPost>;
  private postReplies: Map<number, PostReply>;
  
  private userId: number;
  private healthLogId: number;
  private mealLogId: number;
  private communityPostId: number;
  private postReplyId: number;
  
  constructor() {
    this.users = new Map();
    this.healthLogs = new Map();
    this.mealLogs = new Map();
    this.communityPosts = new Map();
    this.postReplies = new Map();
    
    this.userId = 1;
    this.healthLogId = 1;
    this.mealLogId = 1;
    this.communityPostId = 1;
    this.postReplyId = 1;
    
    // Create a default user
    this.createUser({
      username: "amanda",
      password: "password",
      name: "Amanda",
      email: "amanda@university.edu"
    });
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }
  
  // Health log operations
  async createHealthLog(log: InsertHealthLog): Promise<HealthLog> {
    const id = this.healthLogId++;
    const date = new Date();
    const healthLog: HealthLog = { ...log, id, date };
    this.healthLogs.set(id, healthLog);
    return healthLog;
  }
  
  async getHealthLogsByUserId(userId: number): Promise<HealthLog[]> {
    return Array.from(this.healthLogs.values()).filter(
      (log) => log.userId === userId
    );
  }
  
  async getHealthLogsByDate(userId: number, date: Date): Promise<HealthLog | undefined> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return Array.from(this.healthLogs.values()).find(
      (log) => log.userId === userId && 
        log.date >= startOfDay && 
        log.date <= endOfDay
    );
  }
  
  // Meal log operations
  async createMealLog(log: InsertMealLog): Promise<MealLog> {
    const id = this.mealLogId++;
    const date = new Date();
    const mealLog: MealLog = { ...log, id, date };
    this.mealLogs.set(id, mealLog);
    return mealLog;
  }
  
  async getMealLogsByUserId(userId: number): Promise<MealLog[]> {
    return Array.from(this.mealLogs.values()).filter(
      (log) => log.userId === userId
    );
  }
  
  async getMealLogsByDate(userId: number, date: Date): Promise<MealLog[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return Array.from(this.mealLogs.values()).filter(
      (log) => log.userId === userId && 
        log.date >= startOfDay && 
        log.date <= endOfDay
    );
  }
  
  async updateMealLog(id: number, log: Partial<InsertMealLog>): Promise<MealLog | undefined> {
    const existingLog = this.mealLogs.get(id);
    if (!existingLog) return undefined;
    
    const updatedLog: MealLog = { ...existingLog, ...log };
    this.mealLogs.set(id, updatedLog);
    return updatedLog;
  }
  
  async deleteMealLog(id: number): Promise<boolean> {
    return this.mealLogs.delete(id);
  }
  
  // Community posts operations
  async createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost> {
    const id = this.communityPostId++;
    const createdAt = new Date();
    const communityPost: CommunityPost = { 
      ...post, 
      id, 
      createdAt, 
      upvotes: 0 
    };
    this.communityPosts.set(id, communityPost);
    return communityPost;
  }
  
  async getCommunityPosts(category?: string): Promise<CommunityPost[]> {
    let posts = Array.from(this.communityPosts.values());
    
    if (category && category !== "all") {
      posts = posts.filter(post => post.category === category);
    }
    
    // Sort by createdAt desc
    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getCommunityPostById(id: number): Promise<CommunityPost | undefined> {
    return this.communityPosts.get(id);
  }
  
  async upvotePost(id: number): Promise<CommunityPost | undefined> {
    const post = this.communityPosts.get(id);
    if (!post) return undefined;
    
    const updatedPost: CommunityPost = { 
      ...post, 
      upvotes: post.upvotes + 1 
    };
    this.communityPosts.set(id, updatedPost);
    return updatedPost;
  }
  
  // Post replies operations
  async createPostReply(reply: InsertPostReply): Promise<PostReply> {
    const id = this.postReplyId++;
    const createdAt = new Date();
    const postReply: PostReply = { 
      ...reply, 
      id, 
      createdAt, 
      upvotes: 0 
    };
    this.postReplies.set(id, postReply);
    return postReply;
  }
  
  async getPostRepliesByPostId(postId: number): Promise<PostReply[]> {
    return Array.from(this.postReplies.values())
      .filter(reply => reply.postId === postId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async upvoteReply(id: number): Promise<PostReply | undefined> {
    const reply = this.postReplies.get(id);
    if (!reply) return undefined;
    
    const updatedReply: PostReply = { 
      ...reply, 
      upvotes: reply.upvotes + 1 
    };
    this.postReplies.set(id, updatedReply);
    return updatedReply;
  }
}

// Export storage singleton
export const storage = new MemStorage();
