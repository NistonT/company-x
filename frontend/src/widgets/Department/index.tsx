import { useGetAllQuery } from "@/entities/departments/api/departmentsApi";
import { IDepartment } from "@/entities/departments/model/types";
import { DepartmentCreateForm } from "@/features/department/ui/DepartmentCreateForm";
import { FooterStatistics, SearchTable } from "@/shared/ui";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { m } from "motion/react";
import { useState } from "react";
import { columnDefs, getRowStyle } from "./table/columns";
import { ShowDeletes } from "./ui";

export const Department = () => {
  const { data = [] } = useGetAllQuery();
  const [filter, setFilter] = useState<string>("");
  const [showDeletes, setShowDeletes] = useState<boolean>(true);

  const filteredData = showDeletes ? data : data.filter((d) => !d.liquidatedDate);

  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-gray-950">Подразделения</h2>
      </div>

      <DepartmentCreateForm />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchTable filter={filter} setFilter={setFilter} placeholder="Поиск по коду, названию..." />

          <ShowDeletes showDeletes={showDeletes} setShowDeletes={setShowDeletes} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="ag-theme-quartz rounded-lg overflow-hidden border border-gray-200" style={{ height: 500, width: "100%" }}>
          <AgGridReact<IDepartment>
            rowData={filteredData}
            columnDefs={columnDefs}
            getRowStyle={getRowStyle}
            quickFilterText={filter}
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true,
            }}
            animateRows={true}
            rowSelection="single"
            pagination={true}
            paginationPageSize={20}
          />
        </div>
      </div>

      <FooterStatistics data={data} />
    </m.div>
  );
};
