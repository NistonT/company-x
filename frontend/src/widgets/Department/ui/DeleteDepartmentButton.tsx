import { useDeleteMutation } from "@/entities/departments/api/departmentsApi";
import { m } from "motion/react";

interface Props {
  departmentId: number;
}

export const DeleteDepartmentButton = ({ departmentId }: Props) => {
  const [deleteDepartment, { isLoading }] = useDeleteMutation();

  return (
    <m.span
      onClick={() => deleteDepartment(departmentId)}
      className="relative hover:bg-red-100 hover:text-red-500 active:bg-red-200 transition-colors"
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      aria-label="Удалить"
    >
      <m.div
        key={isLoading ? "loading" : "idle"}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.15 }}
      >
        {isLoading ? <span>Удаление...</span> : <span>Удалить</span>}
      </m.div>
    </m.span>
  );
};
