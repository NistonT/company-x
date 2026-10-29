import { z } from "zod";

export const addEmployeeSchema = z
  .object({
    tabNumber: z.string().min(1, "Табельный номер обязателен").max(20, "Максимум 20 символов").trim(),

    fullName: z
      .string()
      .trim()
      .min(1, "ФИО обязательно")
      .max(150, "ФИО не может быть длиннее 150 символов")
      .refine(
        (val) => /^[А-ЯЁ][а-яё-]+(?: [А-ЯЁ][а-яё-]+){1,2}$/.test(val),
        "Введите Фамилию и Имя. Отчество — по желанию. Каждое слово с заглавной буквы",
      ),
    gender: z
      .string()
      .min(1, "Выберите пол")
      .refine((val) => val === "Male" || val === "Female", {
        message: "Выберите корректное значение пола",
      }),

    birthDate: z
      .string()
      .min(1, "Дата рождения обязательна")
      .refine((date) => {
        const parsed = new Date(date);
        return !isNaN(parsed.getTime()) && parsed < new Date();
      }, "Некорректная дата или дата из будущего"),

    hireDate: z
      .string()
      .min(1, "Дата приема обязательна")
      .refine((date) => {
        const parsed = new Date(date);
        return !isNaN(parsed.getTime());
      }, "Некорректная дата"),

    position: z.string().min(2, "Должность должна содержать минимум 2 символа").max(100, "Должность не может быть длиннее 100 символов").trim(),

    phone: z.string().refine((val) => val === "" || /^[\d\s+()-]+$/.test(val), { message: "Некорректный формат телефона" }),

    email: z.string().refine((val) => val === "" || z.string().email().safeParse(val).success, { message: "Некорректный формат email" }),

    departmentId: z.coerce.number().min(1, "Выберите корректное подразделение"),
  })
  .refine(
    (data) => {
      const birth = new Date(data.birthDate);
      const hire = new Date(data.hireDate);
      return hire >= birth;
    },
    {
      message: "Дата приема не может быть раньше даты рождения",
      path: ["hireDate"],
    },
  );

export type TAddEmployeeForm = z.infer<typeof addEmployeeSchema>;
export type FormInput = z.input<typeof addEmployeeSchema>;
export type FormOutput = z.output<typeof addEmployeeSchema>;
