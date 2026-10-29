import { pageRouter } from "@/shared/consts/page-router";
import { Building2, FileText, LucideIcon, Users } from "lucide-react";

export interface INavItems {
  to: string;
  label: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
  description: string;
}

export const navItems: INavItems[] = [
  {
    to: pageRouter.DEPARTMENTS,
    label: "Подразделения",
    icon: Building2,
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
    description: "Управление отделами",
  },
  {
    to: pageRouter.EMPLOYEES,
    label: "Сотрудники",
    icon: Users,
    color: "from-green-500 to-green-600",
    hoverColor: "hover:from-green-600 hover:to-green-700",
    description: "База персонала",
  },
  {
    to: pageRouter.REPORTS,
    label: "Отчеты",
    icon: FileText,
    color: "from-purple-500 to-purple-600",
    hoverColor: "hover:from-purple-600 hover:to-purple-700",
    description: "Аналитика и статистика",
  },
];
