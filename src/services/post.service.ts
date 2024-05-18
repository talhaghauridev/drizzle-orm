import { eq, inArray } from "drizzle-orm";
import { db } from "../db";
import { IPost, posts } from "../drizzle/schema/post.schema";

const PostService = {
  async createPost(data: IPost) {
    return await db.insert(posts).values(data).returning({ id: posts.id });
  },
  async findById(id: string) {
    return await db.query.posts.findFirst({ where: eq(posts.id, id) });
  },
  async deleteOne(id: string) {
    return await db.delete(posts).where(eq(posts.id, id));
  },
  async deleteMany(ids: string[]) {
    return await db.delete(posts).where(inArray(posts.id, ids));
  },
  async updateOne(data: Omit<IPost,"userId">) {
    return await db
      .update(posts)
      .set(data)
      .where(eq(posts.id, String(data.id)));
  },
};

export default PostService;
