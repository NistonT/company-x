import { DepartmentsPage, EmployeesPage, MainPage, ReportsPage } from "@/pages";
import { pageRouter } from "@/shared/consts/page-router";
import { Route, Routes } from "react-router";

export const Router = () => {
  return (
    <Routes>
      <Route path={pageRouter.HOME} element={<MainPage />} />
      <Route path={pageRouter.DEPARTMENTS} element={<DepartmentsPage />} />
      <Route path={pageRouter.EMPLOYEES} element={<EmployeesPage />} />
      <Route path={pageRouter.REPORTS} element={<ReportsPage />} />
    </Routes>
  );
};
