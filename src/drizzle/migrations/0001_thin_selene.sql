ALTER TABLE "posts" RENAME COLUMN "content" TO "description";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "description" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "title" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "userId" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "authorId";