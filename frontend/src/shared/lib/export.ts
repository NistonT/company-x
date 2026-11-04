import type { IDepartment } from "@/entities/departments/model/types";
import type { IEmployee, IReportGroup, IReportItem } from "@/entities/employees/model/types";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export type ExportRow = Record<string, string | number | boolean | null | undefined>;

export const exportToExcel = (data: ExportRow[], fileName: string, sheetName = "Лист1") => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${fileName}.xlsx`);
};

export const exportEmployeesToExcel = (employees: IEmployee[], fileName: string) => {
  const data: ExportRow[] = employees.map((emp) => ({
    "Таб. номер": emp.tabNumber,
    ФИО: emp.fullName,
    Пол: emp.gender === "Male" ? "Мужской" : "Женский",
    Возраст: emp.age,
    Стаж: emp.tenureYears,
    Подразделение: emp.departmentName,
    Должность: emp.position,
    Телефон: emp.phone || "—",
    Email: emp.email || "—",
    Статус: emp.isActive ? "Работает" : "Уволен",
  }));

  exportToExcel(data, fileName);
};

export const exportDepartmentsToExcel = (departments: IDepartment[], fileName: string) => {
  const data: ExportRow[] = departments.map((dept) => ({
    Код: dept.code,
    Название: dept.fullName,
    Сокращение: dept.abbreviation,
    Статус: dept.liquidatedDate ? "Ликвидировано" : "Действует",
    "Дата создания": new Date(dept.createdDate).toLocaleDateString("ru-RU"),
    "Дата ликвидации": dept.liquidatedDate ? new Date(dept.liquidatedDate).toLocaleDateString("ru-RU") : "—",
  }));

  exportToExcel(data, fileName);
};

export const exportReportToExcel = (reports: IReportGroup[], fileName: string) => {
  const workbook = XLSX.utils.book_new();

  reports.forEach((group) => {
    const typeName = group.type === "Hire" ? "Прием" : group.type === "Transfer" ? "Перевод" : "Увольнение";

    const data: ExportRow[] = group.items.map((item: IReportItem) => ({
      "Таб. номер": item.tabNumber,
      ФИО: item.fullName,
      Подразделение: item.departmentName,
      Должность: item.position || "—",
      "Дата события": new Date(item.eventDate).toLocaleDateString("ru-RU"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, typeName);
  });

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${fileName}.xlsx`);
};
