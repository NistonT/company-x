import { Eye, EyeOff } from "lucide-react";
import { SetStateAction } from "react";

type Props = {
  showDeletes: boolean;
  setShowDeletes: (value: SetStateAction<boolean>) => void;
};

export const ShowDeletes = ({ showDeletes, setShowDeletes }: Props) => {
  return (
    <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors select-none">
      <input type="checkbox" checked={showDeletes} onChange={(e) => setShowDeletes(e.target.checked)} className="w-4 h-4 text-gray-950 rounded" />
      {showDeletes ? <Eye className="w-4 h-4 text-gray-700" /> : <EyeOff className="w-4 h-4 text-gray-500" />}
      <span className="text-sm text-gray-700 font-medium">Показать удаленные</span>
    </label>
  );
};
