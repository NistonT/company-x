import { baseApi } from "@/shared/api/base";
import { ICreateDepartmentDto, IDepartment } from "../model/types";

const BASE = "/departments";

export const departmentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAll: build.query<IDepartment[], void>({
      query: () => ({
        url: BASE,
        method: "GET",
      }),
      providesTags: (result: IDepartment[] | undefined) =>
        result
          ? [
              ...result.map(({ id }: IDepartment) => ({
                type: "Department" as const,
                id,
              })),
              { type: "Department" as const, id: "LIST" },
            ]
          : [{ type: "Department" as const, id: "LIST" }],
    }),

    getTree: build.query<IDepartment[], void>({
      query: () => ({
        url: `${BASE}/tree`,
        method: "GET",
      }),
    }),

    create: build.mutation<number, ICreateDepartmentDto>({
      query: (data) => ({
        url: BASE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),

    delete: build.mutation<void, number>({
      query: (id) => ({
        url: `${BASE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),
  }),
});

export const { useGetAllQuery, useGetTreeQuery, useCreateMutation, useDeleteMutation } = departmentsApi;
