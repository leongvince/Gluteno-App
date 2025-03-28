import { pgTable, text, serial, integer, boolean, timestamp, json, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
});

// Mood types for tracking
export const moodEnum = pgEnum("mood_type", ["great", "good", "okay", "notGreat", "bad"]);

// Health tracking schema
export const healthLogs = pgTable("health_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: timestamp("date").defaultNow(),
  mood: text("mood", { enum: ["great", "good", "okay", "notGreat", "bad"] }),
  symptoms: json("symptoms").$type<string[]>(),
  notes: text("notes"),
  isGlutenFree: boolean("is_gluten_free"),
});

export const insertHealthLogSchema = createInsertSchema(healthLogs).pick({
  userId: true,
  mood: true,
  symptoms: true,
  notes: true,
  isGlutenFree: true,
});

// Daily meal tracking
export const mealLogs = pgTable("meal_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: timestamp("date").defaultNow(),
  mealType: text("meal_type", { enum: ["breakfast", "lunch", "dinner", "snack"] }).notNull(),
  recipeId: integer("recipe_id"),
  name: text("name").notNull(),
  isGlutenFree: boolean("is_gluten_free").notNull(),
  notes: text("notes"),
});

export const insertMealLogSchema = createInsertSchema(mealLogs).pick({
  userId: true,
  mealType: true,
  recipeId: true,
  name: true,
  isGlutenFree: true,
  notes: true,
});

// Community posts schema
export const communityPosts = pgTable("community_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category", { enum: ["newlyDiagnosed", "gfRecipes", "budgetMeals", "diningOut", "general"] }).notNull(),
  isAnonymous: boolean("is_anonymous").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  upvotes: integer("upvotes").default(0),
});

export const insertCommunityPostSchema = createInsertSchema(communityPosts).pick({
  userId: true,
  title: true,
  content: true,
  category: true,
  isAnonymous: true,
});

// Community post replies
export const postReplies = pgTable("post_replies", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => communityPosts.id),
  userId: integer("user_id").references(() => users.id),
  content: text("content").notNull(),
  isAnonymous: boolean("is_anonymous").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  upvotes: integer("upvotes").default(0),
});

export const insertPostReplySchema = createInsertSchema(postReplies).pick({
  postId: true,
  userId: true,
  content: true,
  isAnonymous: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type HealthLog = typeof healthLogs.$inferSelect;
export type InsertHealthLog = z.infer<typeof insertHealthLogSchema>;

export type MealLog = typeof mealLogs.$inferSelect;
export type InsertMealLog = z.infer<typeof insertMealLogSchema>;

export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;

export type PostReply = typeof postReplies.$inferSelect;
export type InsertPostReply = z.infer<typeof insertPostReplySchema>;
