import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export const econnectSchema = z.object({
  id: z.string(),
  description: z.string(),
  tariefEconnect: z.number(),
  tarief: z.number().nullable(),
  status: z.string(),
  taskDate: z.string(),
  taskType: z.string(),
  verschilTarief: z.number().optional(),
  studentName: z.string(),
});

export type Econnect = z.infer<typeof econnectSchema>;
export type Task = z.infer<typeof taskSchema>;
