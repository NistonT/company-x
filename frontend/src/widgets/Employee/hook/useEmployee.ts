import { useGetAllQuery } from "@/entities/departments/api/departmentsApi";
import { useGetAllEmployeesQuery, useMoveEmployeesMutation } from "@/entities/employees/api/employeesApi";
import type { IEmployee } from "@/entities/employees/model/types";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { getEmployeeColumns } from "../table/column";

export const useEmployee = () => {
  const { data: employees = [] } = useGetAllEmployeesQuery();
  const { data: departments = [] } = useGetAllQuery();
  const [movement] = useMoveEmployeesMutation();

  const [filter, setFilter] = useState<string>("");
  const [showDismissed, setShowDismissed] = useState<boolean>(true);

  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);
  const [transferEmployee, setTransferEmployee] = useState<IEmployee | null>(null);
  const [fireEmployee, setFireEmployee] = useState<IEmployee | null>(null);

  const handleTransfer = async (departmentId: number, position: string) => {
    if (!transferEmployee) return;

    await movement({
      employeeId: transferEmployee.id,
      type: "Transfer",
      eventDate: new Date().toISOString(),
      departmentId,
      position,
    }).unwrap();

    toast.success(`Сотрудник ${transferEmployee.fullName} успешно переведен`);
    setTransferEmployee(null);
  };

  const handleFire = async () => {
    if (!fireEmployee) return;

    await movement({
      employeeId: fireEmployee.id,
      type: "Fire",
      eventDate: new Date().toISOString(),
      departmentId: undefined,
      position: undefined,
    }).unwrap();

    toast.success(`Сотрудник ${fireEmployee.fullName} успешно уволен`);
    setFireEmployee(null);
  };

  const columnDefs = useMemo(() => getEmployeeColumns(), []);

  const filteredData = showDismissed ? employees : employees.filter((d) => d.isActive);

  return {
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
  };
};
