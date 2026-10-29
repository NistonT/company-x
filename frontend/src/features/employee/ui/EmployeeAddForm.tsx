import { useGetAllQuery } from "@/entities/departments/api/departmentsApi";
import { ButtonForm, InputForm, SelectForm } from "@/shared/ui";
import { Building2, Calendar, User } from "lucide-react";
import { useEmployeeForm } from "../hook/useEmployeeForm";

export const EmployeeAddForm = () => {
  const { isLoading, register, handleSubmit, onSubmit, errors } = useEmployeeForm();
  const { data = [] } = useGetAllQuery();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputForm icon={User} {...register("tabNumber")} error={errors.tabNumber}>
        Табельный номер
      </InputForm>
      <InputForm icon={User} {...register("fullName")} error={errors.fullName}>
        ФИО
      </InputForm>
      <SelectForm icon={User} label={"Пол"} {...register("gender")}>
        <option value="Male">Мужской</option>
        <option value="Female">Женский</option>
      </SelectForm>
      <InputForm icon={Calendar} type="date" {...register("birthDate")} error={errors.birthDate}>
        Дата рождения
      </InputForm>
      <InputForm icon={Calendar} type="date" {...register("hireDate")} error={errors.hireDate}>
        Дата приема
      </InputForm>
      <InputForm icon={User} {...register("position")} error={errors.position}>
        Должность
      </InputForm>
      <InputForm icon={User} {...register("phone")} error={errors.phone}>
        Телефон
      </InputForm>
      <InputForm icon={User} {...register("email")} error={errors.email}>
        Почта
      </InputForm>
      <SelectForm icon={Building2} label={"Подразделение"} {...register("departmentId", { valueAsNumber: true })}>
        <option value={0}>Выберите подразделение</option>
        {data
          .filter((d) => !d.liquidatedDate)
          .map((d) => (
            <option key={d.id} value={d.id}>
              {d.code} - {d.fullName}
            </option>
          ))}
      </SelectForm>
      <ButtonForm isLoading={isLoading} className="mt-4">
        Сохранить
      </ButtonForm>
    </form>
  );
};
