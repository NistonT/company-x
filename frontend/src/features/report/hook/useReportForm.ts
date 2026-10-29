import type { RootState } from "@/app/store/store";
import { useGetReportsEmployeesQuery } from "@/entities/employees/api/employeesApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { reportSchema, TReportForm } from "../model/schema";

export const useReportForm = () => {
  const startDateState = useSelector((state: RootState) => state.report.startDate);
  const endDateState = useSelector((state: RootState) => state.report.endDate);

  const { register, watch } = useForm<TReportForm>({
    mode: "onBlur",
    resolver: zodResolver(reportSchema),
    defaultValues: {
      startDate: startDateState,
      endDate: endDateState,
    },
  });

  const { startDate, endDate } = watch();

  const {
    data = [],
    isLoading,
    error,
  } = useGetReportsEmployeesQuery({
    startDate,
    endDate,
  });

  return { register, watch, data, isLoading, error };
};
