import { ButtonForm, InputForm } from "@/shared/ui";
import { Building2, Hash, Type } from "lucide-react";
import { m } from "motion/react";
import { useDepartmentForm } from "../hook/useDepartmentForm";

export const DepartmentCreateForm = () => {
  const { isLoading, register, handleSubmit, onSubmit, errors } = useDepartmentForm();

  return (
    <m.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4"
    >
      <div className="flex items-center gap-2 text-gray-900 font-semibold">
        <Building2 className="w-4 h-4 text-gray-950" />
        <span>Новое подразделение</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InputForm icon={Hash} error={errors.code} {...register("code")} placeholder="0000" maxLength={4}>
          Код подразделения
        </InputForm>
        <InputForm icon={Type} error={errors.fullName} {...register("fullName")} placeholder="ИТ-департамент">
          Полное наименование
        </InputForm>
        <InputForm icon={Hash} error={errors.abbreviation} {...register("abbreviation")} placeholder="ИТ">
          Аббревиатура
        </InputForm>
      </div>

      <ButtonForm isLoading={isLoading} type="submit">
        Создать подразделение
      </ButtonForm>
    </m.form>
  );
};
