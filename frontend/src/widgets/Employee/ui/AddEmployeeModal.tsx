import { EmployeeAddForm } from "@/features/employee/ui/EmployeeAddForm";
import { UserPlus, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddEmployeeModal = ({ isOpen, onClose }: Props) => {
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 pointer-events-none"
          >
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl pointer-events-auto overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b bg-linear-to-r from-gray-600 to-gray-700 text-white">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  <h3 className="font-semibold text-lg">Добавить сотрудника</h3>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <EmployeeAddForm />
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};
