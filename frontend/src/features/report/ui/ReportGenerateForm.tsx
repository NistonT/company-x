import { InputForm } from "@/shared/ui";
import { ArrowDownUp, Calendar } from "lucide-react";
import { useReportForm } from "../hook/useReportForm";

export const ReportGenerateForm = () => {
  const { register, isLoading, error } = useReportForm();

  return (
    <form>
      <InputForm icon={Calendar} type="date" {...register("startDate")}>
        С даты
      </InputForm>
      <InputForm icon={Calendar} type="date" {...register("endDate")}>
        По дату
      </InputForm>

      {isLoading && (
        <div className="flex items-center justify-center py-12 text-gray-500">
          <ArrowDownUp className="w-5 h-5 animate-spin mr-2" />
          Загрузка отчета...
        </div>
      )}

      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">Ошибка при загрузке отчета</div>}
    </form>
  );
};
