import type { IDepartment } from "@/entities/departments/model/types";
import type { IEmployee } from "@/entities/employees/model/types";
import { SelectForm } from "@/shared/ui";
import { ArrowRightLeft, Building2, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";

interface Props {
  employee: IEmployee | null;
  departments: IDepartment[];
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (departmentId: number, position: string) => Promise<void>;
}

export const TransferModal = ({ employee, departments, isOpen, onClose, onConfirm }: Props) => {
  const [deptId, setDeptId] = useState(employee?.departmentId || 0);
  const [position, setPosition] = useState(employee?.position || "");
  const [loading, setLoading] = useState(false);

  if (!employee) return null;

  const handleSubmit = async () => {
    if (!deptId) return;
    setLoading(true);
    try {
      await onConfirm(deptId, position);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm pointer-events-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold">Перевод: {employee.fullName}</h3>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <SelectForm icon={Building2} label={"Подразделение"} value={deptId} onChange={(e) => setDeptId(Number(e.target.value))}>
                  <option value={0}>Выберите</option>
                  {departments
                    .filter((d) => !d.liquidatedDate)
                    .map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.code} - {d.fullName}
                      </option>
                    ))}
                </SelectForm>

                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Должность</label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={onClose} className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    Отмена
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !deptId}
                    className="px-3 py-1.5 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                  >
                    {loading ? "..." : "Перевести"}
                  </button>
                </div>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};
