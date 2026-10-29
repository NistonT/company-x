import type { IDepartment } from "@/entities/departments/model/types";
import type { IEmployee } from "@/entities/employees/model/types";
import { isEmployee } from "@/shared/model/types/base";
import { Activity, Archive } from "lucide-react";

type Props = {
  data: IDepartment[] | IEmployee[];
};

export const FooterStatistics = ({ data }: Props) => {
  const activeCount = data.filter((item) => (isEmployee(item) ? item.isActive : !item.liquidatedDate)).length;

  const inactiveCount = data.length - activeCount;

  const isEmpData = data.length > 0 && isEmployee(data[0]);
  const activeLabel = isEmpData ? "Активных" : "Действующих";
  const inactiveLabel = isEmpData ? "Уволено" : "Ликвидировано";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Activity className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium uppercase">{activeLabel}</div>
            <div className="text-xl font-bold text-green-600">{activeCount}</div>
          </div>
        </div>

        <div className="w-px h-12 bg-gray-200" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <Archive className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium uppercase">{inactiveLabel}</div>
            <div className="text-xl font-bold text-gray-600">{inactiveCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
