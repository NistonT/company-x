import { useGetAllEmployeesQuery, useGetReportsEmployeesQuery } from "@/entities/employees/api/employeesApi";
import { useMemo } from "react";
import { TChartData, TStats } from "../model/types";
import { formatDate, getLast30Days } from "../utils/utils";

export const useMain = () => {
  const { data: employees = [] } = useGetAllEmployeesQuery();

  const last30Days = getLast30Days();
  const startDate = last30Days[0];
  const endDate = last30Days[last30Days.length - 1];

  const { data: reports = [] } = useGetReportsEmployeesQuery({
    startDate,
    endDate,
  });

  const chartData: TChartData[] = useMemo(() => {
    const dataMap = new Map<string, { date: string; Hire: number; Transfer: number; Fire: number }>();

    last30Days.forEach((day) => {
      dataMap.set(day, { date: formatDate(day), Hire: 0, Transfer: 0, Fire: 0 });
    });

    reports.forEach((group) => {
      group.items.forEach((item) => {
        const itemDate = item.eventDate.split("T")[0];
        const existing = dataMap.get(itemDate);
        if (existing) {
          existing[group.type]++;
        }
      });
    });

    return Array.from(dataMap.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [reports, last30Days]);

  const stats: TStats = useMemo(() => {
    const totalHire = reports.find((g) => g.type === "Hire")?.items.length || 0;
    const totalTransfer = reports.find((g) => g.type === "Transfer")?.items.length || 0;
    const totalFire = reports.find((g) => g.type === "Fire")?.items.length || 0;
    const activeEmployees = employees.filter((e) => e.isActive).length;

    return { totalHire, totalTransfer, totalFire, activeEmployees };
  }, [reports, employees]);

  return { chartData, stats };
};
