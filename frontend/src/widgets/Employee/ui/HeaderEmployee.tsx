import type { IEmployee } from "@/entities/employees/model/types";
import { Briefcase, Building2, UserRound, X } from "lucide-react";

type Props = {
  employee: IEmployee;
  onClose: () => void;
};

export const HeaderEmployee = ({ employee, onClose }: Props) => {
  return (
    <div className="relative bg-linear-to-r from-gray-600 to-gray-700 p-6 text-white">
      <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-6">
        {employee.photoUrl ? (
          <img src={employee.photoUrl} alt={employee.fullName} className="w-24 h-24 rounded-full border-4 border-white/30 object-cover" />
        ) : (
          <div className="w-24 h-24 rounded-full border-4 border-white/30 bg-white/20 flex items-center justify-center">
            <UserRound className="w-12 h-12 text-white" />
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold">{employee.fullName}</h2>
          <div className="flex items-center gap-2 mt-2 text-gray-100">
            <Building2 className="w-4 h-4" />
            <span>{employee.departmentName || "Не указано"}</span>
            <span className="mx-1">•</span>
            <Briefcase className="w-4 h-4" />
            <span>{employee.position}</span>
          </div>
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mt-3 ${
              employee.isActive
                ? "bg-green-500/20 text-green-100 border border-green-400/30"
                : "bg-gray-500/20 text-gray-200 border border-gray-400/30"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${employee.isActive ? "bg-green-400" : "bg-gray-400"}`} />
            {employee.isActive ? "Работает" : "Уволен"}
          </div>
        </div>
      </div>
    </div>
  );
};
