import z from "zod";

export const reportSchema = z.object({
  startDate: z.string().min(1, "Дата начала обязательна"),
  endDate: z.string().min(1, "Дата окончания обязательна"),
});

export type TReportForm = z.infer<typeof reportSchema>;
