import { z } from "zod";

export const departmentCreateSchema = z.object({
  code: z.string().trim().min(1, "Код подразделения обязателен").length(4, "Код должен содержать ровно 4 символа"),

  fullName: z
    .string()
    .trim()
    .min(1, "Полное наименование обязательно")
    .min(3, "Полное наименование должно содержать минимум 3 символа")
    .max(200, "Полное наименование не может превышать 200 символов"),

  abbreviation: z
    .string()
    .trim()
    .min(1, "Аббревиатура обязательна")
    .min(2, "Аббревиатура должна содержать минимум 2 символа")
    .max(50, "Аббревиатура не может превышать 50 символов"),
});

export type TDepartmentCreate = z.infer<typeof departmentCreateSchema>;
