import { IDepartment } from "@/entities/departments/model/types";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { DeleteDepartmentButton } from "../ui/DeleteDepartmentButton";

export const columnDefs: ColDef<IDepartment>[] = [
  {
    field: "code",
    headerName: "Код",
    width: 100,
  },
  {
    field: "fullName",
    headerName: "Наименование",
    flex: 1,
  },
  {
    field: "abbreviation",
    headerName: "Аббревиатура",
    flex: 1,
  },
  {
    headerName: "Статус",
    width: 200,
    valueGetter: (params) => (params.data?.liquidatedDate ? `Удален ${params.data.liquidatedDate.split("T")[0]}` : "Активен"),
    cellStyle: (params) => ({
      color: params.data?.liquidatedDate ? "#999" : "#28a745",
    }),
  },
  {
    headerName: "Действия",
    width: 150,
    cellRenderer: (params: ICellRendererParams<IDepartment>) => {
      if (params.data?.liquidatedDate) return null;

      return <DeleteDepartmentButton departmentId={params.data!.id} />;
    },
  },
];

export const getRowStyle = (params: { data?: IDepartment }) => {
  if (params.data?.liquidatedDate) {
    return { opacity: 0.5, backgroundColor: "#f5f5f5" };
  }
  return undefined;
};
