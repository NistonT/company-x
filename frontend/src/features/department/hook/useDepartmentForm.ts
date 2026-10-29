import { useCreateMutation } from "@/entities/departments/api/departmentsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { departmentCreateSchema, type TDepartmentCreate } from "../model/schema";

export const useDepartmentForm = () => {
  const [create, { isLoading }] = useCreateMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TDepartmentCreate>({
    resolver: zodResolver(departmentCreateSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: TDepartmentCreate) => {
    try {
      await create(data).unwrap();
      toast.success("Подразделения добавлена!");
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
