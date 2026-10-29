import type { RootState } from "@/app/store/store";
import { useGetReportsEmployeesQuery } from "@/entities/employees/api/employeesApi";
import { ReportGenerateForm } from "@/features/report/ui/ReportGenerateForm";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { FileText } from "lucide-react";
import { m } from "motion/react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getReportColumns, type ReportRow } from "./table/column";

export const Report = () => {
  const startDateState = useSelector((state: RootState) => state.report.startDate);
  const endDateState = useSelector((state: RootState) => state.report.endDate);

  const {
    data: reports = [],
    isLoading,
    error,
  } = useGetReportsEmployeesQuery({
    startDate: startDateState,
    endDate: endDateState,
  });

  const columnDefs = getReportColumns();

  const flatData = useMemo<ReportRow[]>(() => {
    return reports.flatMap((group) => group.items.map((item) => ({ ...item, type: group.type })));
  }, [reports]);

  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-gray-900">Отчет по кадровым перемещениям</h2>
      </div>
      <ReportGenerateForm />
      {!isLoading && !error && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="ag-theme-quartz rounded-lg overflow-hidden border border-gray-200" style={{ height: 600, width: "100%" }}>
            <AgGridReact<ReportRow>
              rowData={flatData}
              columnDefs={columnDefs}
              defaultColDef={{
                resizable: true,
                sortable: true,
                filter: true,
              }}
              animateRows={true}
              pagination={true}
              paginationPageSize={20}
              groupDisplayType="singleColumn"
              autoGroupColumnDef={{
                headerName: "Тип перемещения",
                width: 220,
                cellRendererParams: { suppressCount: false },
              }}
              getRowStyle={(params) => {
                if (params.node?.group) {
                  return { backgroundColor: "#f9fafb", fontWeight: 600 };
                }
                return undefined;
              }}
            />
          </div>

          {flatData.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Нет данных за выбранный период</p>
              <p className="text-xs text-gray-400 mt-1">Попробуйте изменить диапазон дат</p>
            </div>
          )}
        </div>
      )}
    </m.div>
  );
};
