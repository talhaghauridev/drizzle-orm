import { InferInsertModel, relations } from "drizzle-orm";
import { pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { posts } from "./post.schema";

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull(),
    password: varchar("password").notNull(),
  },
  (table) => ({ uniqueEmail: unique("unique_email").on(table.email) })
);

export const userRelation = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export type IUser = InferInsertModel<typeof users>;
