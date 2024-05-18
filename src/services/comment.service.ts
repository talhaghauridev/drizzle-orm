import { eq, inArray } from "drizzle-orm";
import { db } from "../db";
import { comments } from "../drizzle/schema";
import { IComment } from "../drizzle/schema/comment.schema";

const CommentService = {
  async createComment(data: IComment) {
    return await db
      .insert(comments)
      .values(data)
      .returning({ id: comments.id });
  },
  async findById(id: string) {
    return await db.query.comments.findFirst({ where: eq(comments.id, id) });
  },
  async deleteOne(id: string) {
    return await db.delete(comments).where(eq(comments.id, id));
  },
  async deleteMany(ids: string[]) {
    return await db.delete(comments).where(inArray(comments.id, ids));
  },
  async updateOne(comment: {comment:string,id:string}) {
    return await db
      .update(comments)
      .set(comment)
      .where(eq(comments.id, String(comment.id)));
  },

};

export default CommentService;
