import { eq, inArray } from "drizzle-orm";
import { db } from "../db";
import { users } from "../drizzle/schema";
import { IUser } from "../drizzle/schema/user.schema";

const UserService = {
  async createUser(data: IUser) {
    return await db.insert(users).values(data).returning();
  },
  async findEmail(email: string) {
    return await db.query.users.findFirst({
      where: eq(users.email, email),
    });
  },

  async findById(id: string) {
    return await db.query.users.findFirst({ where: eq(users.id, id) });
  },
  async deleteOne(id: string) {
    return await db.delete(users).where(eq(users.id, id));
  },
  async deleteMany(ids: string[]) {
    return await db.delete(users).where(inArray(users.id, ids));
  },
  async updateOne(user: IUser) {
    return await db
      .update(users)
      .set(user)
      .where(eq(users.id, String(user.id)));
  },
  async updateMany(usersData: IUser, ids: string[]) {
    return await db.update(users).set(usersData).where(inArray(users.id, ids));
  },
};

export default UserService;
