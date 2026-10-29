import type { IEmployee } from "@/entities/employees/model/types";
import type { ColDef, ICellRendererParams, RowStyle } from "ag-grid-community";

export const getEmployeeColumns = (): ColDef<IEmployee>[] => [
  {
    field: "tabNumber",
    headerName: "Таб. номер",
    width: 130,
    cellStyle: { fontWeight: 600, color: "#374151" },
  },
  {
    field: "fullName",
    headerName: "ФИО",
    flex: 1,
    minWidth: 200,
    cellStyle: { color: "#111827" },
  },
  {
    field: "age",
    headerName: "Возраст",
    width: 100,
    valueFormatter: (params) => (params.value ? `${params.value} лет` : "—"),
  },
  {
    field: "tenureYears",
    headerName: "Стаж",
    width: 100,
    valueFormatter: (params) => (params.value ? `${params.value} лет` : "—"),
  },
  {
    field: "departmentName",
    headerName: "Подразделение",
    flex: 1,
    minWidth: 180,
  },
  {
    field: "position",
    headerName: "Должность",
    width: 180,
  },
  {
    headerName: "Статус",
    width: 160,
    cellRenderer: (params: ICellRendererParams<IEmployee>) => {
      if (!params.data) return null;
      const isActive = params.data.isActive;
      const date = params.data.dismissalDate?.split("T")[0];

      return (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? "bg-green-500" : "bg-gray-400"}`} />
          <span className={`text-sm font-medium ${isActive ? "text-green-500" : "text-gray-500"}`}>{isActive ? "Работает" : `Уволен ${date}`}</span>
        </div>
      );
    },
    valueGetter: (params) => params.data?.isActive,
  },
];

export const getEmployeeRowStyle = (params: { data?: IEmployee }): RowStyle | undefined => {
  if (params.data && !params.data.isActive) {
    return {
      opacity: 0.6,
      backgroundColor: "#f9fafb",
    };
  }

  return undefined;
};
