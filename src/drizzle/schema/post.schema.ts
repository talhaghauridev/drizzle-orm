import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { InferInsertModel, relations } from "drizzle-orm";
import { comments } from "./comment.schema";

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const postsRelation = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  comments: many(comments),
}));


export type IPost = InferInsertModel<typeof posts>