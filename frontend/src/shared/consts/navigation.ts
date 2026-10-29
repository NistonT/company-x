import { FileText, FolderTree, Users } from "lucide-react";
import { pageRouter } from "./page-router";

export const navItems = [
  { to: pageRouter.EMPLOYEES, label: "Сотрудники", icon: Users },
  { to: pageRouter.DEPARTMENTS, label: "Подразделения", icon: FolderTree },
  { to: pageRouter.REPORTS, label: "Отчеты", icon: FileText },
];
