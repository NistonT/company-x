import type { IEmployee } from "@/entities/employees/model/types";
import { AlertTriangle, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";

interface Props {
  employee: IEmployee | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const FireModal = ({ employee, isOpen, onClose, onConfirm }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  if (!employee) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
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
                  <AlertTriangle className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold">Увольнение</h3>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-800">
                    Уволить <strong>{employee.fullName}</strong>?
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {employee.position} - {employee.departmentName}
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <button onClick={onClose} className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    Отмена
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="px-3 py-1.5 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                  >
                    {loading ? "..." : "Уволить"}
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
