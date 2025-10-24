import { relations } from "drizzle-orm";
import {
    date,
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    text,
    timestamp,
    uniqueIndex,
    varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: text().notNull(),
    createdAt: timestamp().defaultNow(),
    deletedAt: timestamp(),
});
export const categoriesTable = pgTable("categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull().unique(),
});
export const exercisesTable = pgTable("exercises", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    description: text().notNull(),
});
export const exerciseCategoriesTable = pgTable(
    "exercises_categories",
    {
        exerciseId: integer("exercise_id")
            .notNull()
            .references(() => exercisesTable.id),
        categoryId: integer("category_id")
            .notNull()
            .references(() => categoriesTable.id),
    },
    (table) => [primaryKey({ columns: [table.exerciseId, table.categoryId] })]
);

export const workoutsTable = pgTable("workouts", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    userId: integer("user_id")
        .notNull()
        .references(() => usersTable.id),
    createdAt: timestamp().defaultNow(),
    deletedAt: timestamp(),
});

export const weekdayEnum = pgEnum("weekday", [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]);
export const workoutDaysTable = pgTable("workout_days", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    workoutId: integer("workout_id")
        .notNull()
        .references(() => workoutsTable.id),
    weekday: weekdayEnum("weekday").notNull(),
});

export const workoutDayExercisesTable = pgTable(
    "workout_day_exercises",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),

        workoutDayId: integer("workout_day_id")
            .notNull()
            .references(() => workoutDaysTable.id, { onDelete: "cascade" }),

        exerciseId: integer("exercise_id")
            .notNull()
            .references(() => exercisesTable.id, { onDelete: "cascade" }),
    },
    (table) => [
        uniqueIndex("unique_day_exercise").on(
            table.workoutDayId,
            table.exerciseId
        ),
    ]
);
export const exerciseLogsTable = pgTable(
    "exercise_logs",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        userId: integer("user_id")
            .notNull()
            .references(() => usersTable.id),
        workoutDay: integer()
            .notNull()
            .references(() => workoutDaysTable.id),
        exerciseId: integer()
            .notNull()
            .references(() => exercisesTable.id),
        perfomedAt: date().defaultNow(),
        weight: integer().notNull(),
        reps: integer().notNull(),
    },
    (table) => [
        uniqueIndex("unique_exercise_per_day").on(
            table.userId,
            table.perfomedAt,
            table.exerciseId
        ),
    ]
);
export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
    exerciseCategories: many(exerciseCategoriesTable),
}));
export const exerciseRelation = relations(exercisesTable, ({ many }) => ({
    exerciseCategories: many(exerciseCategoriesTable),
}));
export const exerciseCategoriesRelations = relations(
    exerciseCategoriesTable,
    ({ one }) => ({
        category: one(categoriesTable, {
            fields: [exerciseCategoriesTable.categoryId],
            references: [categoriesTable.id],
        }),
        exercise: one(exercisesTable, {
            fields: [exerciseCategoriesTable.exerciseId],
            references: [exercisesTable.id],
        }),
    })
);
export const workoutsRelations = relations(workoutsTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [workoutsTable.userId],
        references: [usersTable.id],
    }),
    workoutDays: many(workoutDaysTable),
}));

export const workoutDaysRelations = relations(
    workoutDaysTable,
    ({ one, many }) => ({
        workout: one(workoutsTable, {
            fields: [workoutDaysTable.workoutId],
            references: [workoutsTable.id],
        }),
        workoutDaysExercises: many(workoutDayExercisesTable),
        exerciseLogsTable: many(exerciseLogsTable),
    })
);
export const workoutDayExercisesRelations = relations(
    workoutDayExercisesTable,
    ({ one }) => ({
        workoutDay: one(workoutDaysTable, {
            fields: [workoutDayExercisesTable.workoutDayId],
            references: [workoutDaysTable.id],
        }),
        exercise: one(exercisesTable, {
            fields: [workoutDayExercisesTable.exerciseId],
            references: [exercisesTable.id],
        }),
    })
);
export const exerciseLogsRelations = relations(
    exerciseLogsTable,
    ({ one }) => ({
        user: one(usersTable, {
            fields: [exerciseLogsTable.userId],
            references: [usersTable.id],
        }),
        workoutDay: one(workoutDaysTable, {
            fields: [exerciseLogsTable.workoutDay],
            references: [workoutDaysTable.id],
        }),
        exercise: one(exercisesTable, {
            fields: [exerciseLogsTable.exerciseId],
            references: [exercisesTable.id],
        }),
    })
);
