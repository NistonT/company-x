import type { IReportItem } from "@/entities/employees/model/types";
import { typeConfig } from "@/features/report/utils";
import { ColDef, ICellRendererParams, ValueFormatterParams } from "ag-grid-community";

export type ReportRow = IReportItem & { type: string };

export const getReportColumns = (): ColDef<ReportRow>[] => [
  {
    field: "type",
    headerName: "Тип перемещения",
    width: 180,
    rowGroup: true,
    hide: true,
    cellRenderer: (params: ICellRendererParams<ReportRow>) => {
      const config = typeConfig[params.value as string] || {
        label: params.value,
        color: "text-gray-700",
        bg: "bg-gray-100",
      };
      return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>{config.label}</span>
      );
    },
  },
  {
    field: "tabNumber",
    headerName: "Таб. номер",
    width: 130,
    cellStyle: { fontWeight: 600 },
  },
  {
    field: "fullName",
    headerName: "ФИО",
    flex: 1,
    minWidth: 200,
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
    valueFormatter: (params: ValueFormatterParams<ReportRow>) => params.value || "—",
  },
  {
    field: "eventDate",
    headerName: "Дата события",
    width: 140,
    valueFormatter: (params: ValueFormatterParams<ReportRow>) => (params.value ? new Date(params.value).toLocaleDateString("ru-RU") : "—"),
  },
];
