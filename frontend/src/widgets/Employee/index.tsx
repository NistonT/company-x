import type { IEmployee } from "@/entities/employees/model/types";
import { Button, FooterStatistics, SearchTable } from "@/shared/ui";
import { AgGridReact } from "ag-grid-react";
import { Plus } from "lucide-react";
import { m } from "motion/react";
import { useState } from "react";
import { useEmployee } from "./hook/useEmployee";
import { getEmployeeRowStyle } from "./table/column";
import { AddEmployeeModal, FireModal, ModalEmployee, ShowDeletes, TransferModal } from "./ui";

export const Employee = () => {
  const {
    employees,
    departments,
    filter,
    setFilter,
    showDismissed,
    setShowDismissed,
    selectedEmployee,
    setSelectedEmployee,
    transferEmployee,
    setTransferEmployee,
    fireEmployee,
    setFireEmployee,
    handleTransfer,
    handleFire,
    columnDefs,
    filteredData,
  } = useEmployee();

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Сотрудники</h2>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Добавить сотрудника
        </Button>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchTable filter={filter} setFilter={setFilter} placeholder="Поиск по ФИО, таб. номеру, должности..." />

            <ShowDeletes showDismissed={showDismissed} setShowDismissed={setShowDismissed} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="ag-theme-quartz rounded-lg overflow-hidden border border-gray-200" style={{ height: 600, width: "100%" }}>
            <AgGridReact<IEmployee>
              rowData={filteredData}
              columnDefs={columnDefs}
              getRowStyle={getEmployeeRowStyle}
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

              onRowClicked={(event) => {
                if (event.data) {
                  setSelectedEmployee(event.data);
                }
              }}
            />
          </div>
        </div>

        <FooterStatistics data={employees} />
      </div>

      <AddEmployeeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      <ModalEmployee
        employee={selectedEmployee}
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        onTransfer={(data) => setTransferEmployee(data)}
        onFire={(data) => setFireEmployee(data)}
      />

      <TransferModal
        employee={transferEmployee}
        departments={departments}
        isOpen={!!transferEmployee}
        onClose={() => setTransferEmployee(null)}
        onConfirm={handleTransfer}
      />

      <FireModal employee={fireEmployee} isOpen={!!fireEmployee} onClose={() => setFireEmployee(null)} onConfirm={handleFire} />
    </m.div>
  );
};
