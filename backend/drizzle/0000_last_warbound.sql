CREATE TYPE "public"."weekday" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');--> statement-breakpoint
CREATE TABLE "exercise_logs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "exercise_logs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"workoutDay" integer NOT NULL,
	"exerciseId" integer NOT NULL,
	"perfomedAt" date DEFAULT now(),
	"weight" integer NOT NULL,
	"reps" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercises" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "exercises_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "exercises_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"deletedAt" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "workout_day_exercises" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "workout_day_exercises_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"workout_day_id" integer NOT NULL,
	"exercise_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workout_days" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "workout_days_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"workout_id" integer NOT NULL,
	"weekday" "weekday" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workouts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "workouts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"user_id" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "exercise_logs" ADD CONSTRAINT "exercise_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_logs" ADD CONSTRAINT "exercise_logs_workoutDay_workout_days_id_fk" FOREIGN KEY ("workoutDay") REFERENCES "public"."workout_days"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_logs" ADD CONSTRAINT "exercise_logs_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_day_exercises" ADD CONSTRAINT "workout_day_exercises_workout_day_id_workout_days_id_fk" FOREIGN KEY ("workout_day_id") REFERENCES "public"."workout_days"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_day_exercises" ADD CONSTRAINT "workout_day_exercises_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_days" ADD CONSTRAINT "workout_days_workout_id_workouts_id_fk" FOREIGN KEY ("workout_id") REFERENCES "public"."workouts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_exercise_per_day" ON "exercise_logs" USING btree ("user_id","perfomedAt","exerciseId");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_day_exercise" ON "workout_day_exercises" USING btree ("workout_day_id","exercise_id");