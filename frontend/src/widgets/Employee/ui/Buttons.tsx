import type { IEmployee } from "@/entities/employees/model/types";
import { Button } from "@/shared/ui";
import { ArrowRightLeft, UserX } from "lucide-react";

type Props = {
  employee: IEmployee;
  onTransfer: (data: IEmployee) => void;
  onFire: (emp: IEmployee) => void;
  onClose: () => void;
};

export const Buttons = ({ employee, onTransfer, onFire, onClose }: Props) => {
  return (
    <>
      {employee.isActive && (
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <Button
            onClick={() => {
              onTransfer(employee);
              onClose();
            }}
          >
            <ArrowRightLeft className="w-4 h-4" />
            Перевести
          </Button>
          <Button
            onClick={() => {
              onFire(employee);
              onClose();
            }}
          >
            <UserX className="w-4 h-4" />
            Уволить
          </Button>
        </div>
      )}
    </>
  );
};
