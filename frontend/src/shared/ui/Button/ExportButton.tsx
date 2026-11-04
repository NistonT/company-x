import type { IDepartment } from "@/entities/departments/model/types";
import type { IEmployee, IReportGroup } from "@/entities/employees/model/types";
import { exportDepartmentsToExcel, exportEmployeesToExcel, exportReportToExcel } from "@/shared/lib/export";
import { FileSpreadsheet } from "lucide-react";

interface ExportButtonProps {
  type: "employees" | "departments" | "report";
  employees?: IEmployee[];
  departments?: IDepartment[];
  reports?: IReportGroup[];
}

export const ExportButton = ({ type, employees, departments, reports }: ExportButtonProps) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const handleExport = () => {
    switch (type) {
      case "employees":
        if (employees) exportEmployeesToExcel(employees, `Сотрудники_${currentDate}`);
        break;
      case "departments":
        if (departments) exportDepartmentsToExcel(departments, `Подразделения_${currentDate}`);
        break;
      case "report":
        if (reports) exportReportToExcel(reports, `Отчет_${currentDate}`);
        break;
    }
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
      title="Экспорт в Excel"
    >
      <FileSpreadsheet className="w-4 h-4" />
      Excel
    </button>
  );
};
