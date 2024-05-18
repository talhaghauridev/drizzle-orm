import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { posts } from "./post.schema";
import { InferInsertModel, relations } from "drizzle-orm";

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  comment: varchar("content").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  postId: uuid("postId")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
});

export const commentsRelation = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));

export type IComment = InferInsertModel<typeof comments>