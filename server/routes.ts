import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertHealthLogSchema, 
  insertMealLogSchema, 
  insertCommunityPostSchema, 
  insertPostReplySchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const router = express.Router();
  
  // Health check endpoint
  router.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });
  
  // User endpoints
  router.post("/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  
  router.get("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const user = await storage.getUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });
  
  // Health log endpoints
  router.post("/health-logs", async (req, res) => {
    try {
      const healthLogData = insertHealthLogSchema.parse(req.body);
      const healthLog = await storage.createHealthLog(healthLogData);
      res.status(201).json(healthLog);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create health log" });
    }
  });
  
  router.get("/health-logs/user/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const healthLogs = await storage.getHealthLogsByUserId(userId);
    res.json(healthLogs);
  });
  
  router.get("/health-logs/user/:userId/date/:date", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const dateObj = new Date(req.params.date);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    
    const healthLog = await storage.getHealthLogsByDate(userId, dateObj);
    if (!healthLog) {
      return res.json(null);
    }
    
    res.json(healthLog);
  });
  
  // Meal log endpoints
  router.post("/meal-logs", async (req, res) => {
    try {
      const mealLogData = insertMealLogSchema.parse(req.body);
      const mealLog = await storage.createMealLog(mealLogData);
      res.status(201).json(mealLog);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create meal log" });
    }
  });
  
  router.get("/meal-logs/user/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const mealLogs = await storage.getMealLogsByUserId(userId);
    res.json(mealLogs);
  });
  
  router.get("/meal-logs/user/:userId/date/:date", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const dateObj = new Date(req.params.date);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    
    const mealLogs = await storage.getMealLogsByDate(userId, dateObj);
    res.json(mealLogs);
  });
  
  router.patch("/meal-logs/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid meal log ID" });
    }
    
    try {
      const updatedMealLog = await storage.updateMealLog(id, req.body);
      if (!updatedMealLog) {
        return res.status(404).json({ message: "Meal log not found" });
      }
      
      res.json(updatedMealLog);
    } catch (error) {
      res.status(500).json({ message: "Failed to update meal log" });
    }
  });
  
  router.delete("/meal-logs/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid meal log ID" });
    }
    
    const success = await storage.deleteMealLog(id);
    if (!success) {
      return res.status(404).json({ message: "Meal log not found" });
    }
    
    res.status(204).end();
  });
  
  // Community post endpoints
  router.post("/community-posts", async (req, res) => {
    try {
      const postData = insertCommunityPostSchema.parse(req.body);
      const post = await storage.createCommunityPost(postData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create community post" });
    }
  });
  
  router.get("/community-posts", async (req, res) => {
    const category = req.query.category as string | undefined;
    const posts = await storage.getCommunityPosts(category);
    res.json(posts);
  });
  
  router.get("/community-posts/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    
    const post = await storage.getCommunityPostById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.json(post);
  });
  
  router.post("/community-posts/:id/upvote", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    
    const updatedPost = await storage.upvotePost(id);
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.json(updatedPost);
  });
  
  // Post reply endpoints
  router.post("/post-replies", async (req, res) => {
    try {
      const replyData = insertPostReplySchema.parse(req.body);
      const reply = await storage.createPostReply(replyData);
      res.status(201).json(reply);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create reply" });
    }
  });
  
  router.get("/post-replies/:postId", async (req, res) => {
    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    
    const replies = await storage.getPostRepliesByPostId(postId);
    res.json(replies);
  });
  
  router.post("/post-replies/:id/upvote", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid reply ID" });
    }
    
    const updatedReply = await storage.upvoteReply(id);
    if (!updatedReply) {
      return res.status(404).json({ message: "Reply not found" });
    }
    
    res.json(updatedReply);
  });
  
  // Mount the router with the /api prefix
  app.use("/api", router);

  const httpServer = createServer(app);
  return httpServer;
}
