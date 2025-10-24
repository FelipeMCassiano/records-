CREATE TABLE "categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "exercises_categories" (
	"exercise_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "exercises_categories_exercise_id_category_id_pk" PRIMARY KEY("exercise_id","category_id")
);
--> statement-breakpoint
ALTER TABLE "exercises_categories" ADD CONSTRAINT "exercises_categories_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercises_categories" ADD CONSTRAINT "exercises_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;