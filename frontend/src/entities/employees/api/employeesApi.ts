import { baseApi } from "@/shared/api/base";
import { ICreateEmployeeDto, IEmployee, IMovementDto, IReportGroup, IReportParams } from "../model/types";

const BASE = "/employees";

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllEmployees: build.query<IEmployee[], void>({
      query: () => ({
        url: `${BASE}?includeDismissed=true`,
        method: "GET",
      }),
      providesTags: (result: IEmployee[] | undefined) =>
        result
          ? [
              ...result.map(({ id }: IEmployee) => ({
                type: "Employee" as const,
                id,
              })),
              { type: "Employee" as const, id: "LIST" },
            ]
          : [{ type: "Employee" as const, id: "LIST" }],
    }),
    hireEmployees: build.mutation<IEmployee, ICreateEmployeeDto>({
      query: (data) => ({
        url: `${BASE}/hire`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
    moveEmployees: build.mutation<IEmployee, IMovementDto>({
      query: (data) => ({
        url: `${BASE}/movement`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
    getReportsEmployees: build.query<IReportGroup[], IReportParams>({
      query: (data) => {
        const { startDate, endDate, type } = data;

        const params = new URLSearchParams({ startDate, endDate });

        if (type) params.append("type", type);

        return `${BASE}/report?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetAllEmployeesQuery, useGetReportsEmployeesQuery, useHireEmployeesMutation, useMoveEmployeesMutation } = employeesApi;
