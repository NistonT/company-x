import type { IEmployee } from "@/entities/employees/model/types";
import { Calendar, Hash, Mail, Phone } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { Buttons, HeaderEmployee } from "./";
import { DetailItem } from "./DetailItem";

interface Props {
  employee: IEmployee | null;
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (data: IEmployee) => void;
  onFire: (data: IEmployee) => void;
}

export const ModalEmployee = ({ employee, isOpen, onClose, onTransfer, onFire }: Props) => {
  if (!employee) return null;

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl pointer-events-auto overflow-hidden">
              <HeaderEmployee employee={employee} onClose={onClose} />

              <div className="p-6 grid grid-cols-2 gap-6">
                <DetailItem icon={Hash} label="Табельный номер" value={employee.tabNumber} />
                <DetailItem icon={Calendar} label="Дата рождения" value={new Date(employee.birthDate).toLocaleDateString("ru-RU")} />
                <DetailItem icon={Calendar} label="Дата приема" value={new Date(employee.hireDate).toLocaleDateString("ru-RU")} />
                <DetailItem icon={Calendar} label="Возраст" value={`${employee.age} лет`} />
                <DetailItem icon={Calendar} label="Стаж в компании" value={`${employee.tenureYears} лет`} />
                <DetailItem icon={Phone} label="Телефон" value={employee.phone || "Не указан"} />
                <DetailItem icon={Mail} label="Email" value={employee.email || "Не указан"} colSpan={2} />
              </div>

              <Buttons employee={employee} onTransfer={onTransfer} onFire={onFire} onClose={onClose} />
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};
