import { useHireEmployeesMutation } from "@/entities/employees/api/employeesApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addEmployeeSchema, FormInput, FormOutput } from "../model/schema";

export const useEmployeeForm = () => {
  const [hire, { isLoading }] = useHireEmployeesMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>({
    resolver: zodResolver(addEmployeeSchema),
    mode: "onBlur",
    defaultValues: {
      tabNumber: "",
      fullName: "",
      gender: "Male",
      birthDate: "",
      hireDate: new Date().toISOString().split("T")[0],
      position: "",
      phone: "",
      email: "",
      departmentId: 0,
    },
  });

  const onSubmit = async (data: FormInput) => {
    const result = addEmployeeSchema.safeParse(data);

    if (!result.success) {
      console.error("Validation failed:", result.error);
      return;
    }

    const dto: FormOutput = result.data;

    try {
      await hire(dto).unwrap();
      toast.success("Сотрудник принят на работу");
      reset();
    } catch (error) {
      const err = error as FetchBaseQueryError;

      if ("data" in err && typeof err.data === "string") {
        toast.error(err.data);
      } else if ("status" in err) {
        toast.error(`Ошибка сервера: ${err.status}`);
      } else {
        toast.error("Неизвестная ошибка");
      }
    }
  };

  return { isLoading, register, handleSubmit, onSubmit, errors };
};
