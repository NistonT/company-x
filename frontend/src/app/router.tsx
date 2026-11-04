import { MainPage } from "@/pages";
import { pageRouter } from "@/shared/consts/page-router";
import { Loader } from "@/widgets";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

const DepartmentsPage = lazy(() => import("@/pages/DepartmentsPage"));
const EmployeesPage = lazy(() => import("@/pages/EmployeesPage"));
const ReportsPage = lazy(() => import("@/pages/ReportsPage"));

export const Router = () => {
  return (
    <Routes>
      <Route path={pageRouter.HOME} element={<MainPage />} />

      <Route
        path={pageRouter.DEPARTMENTS}
        element={
          <Suspense fallback={<Loader />}>
            <DepartmentsPage />
          </Suspense>
        }
      />
      <Route
        path={pageRouter.EMPLOYEES}
        element={
          <Suspense fallback={<Loader />}>
            <EmployeesPage />
          </Suspense>
        }
      />
      <Route
        path={pageRouter.REPORTS}
        element={
          <Suspense fallback={<Loader />}>
            <ReportsPage />
          </Suspense>
        }
      />
    </Routes>
  );
};
