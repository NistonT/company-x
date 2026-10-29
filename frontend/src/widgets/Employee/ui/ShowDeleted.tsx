import { SetStateAction } from "react";

type Props = {
  showDismissed: boolean;
  setShowDismissed: (value: SetStateAction<boolean>) => void;
};

export const ShowDeletes = ({ showDismissed, setShowDismissed }: Props) => {
  return (
    <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors select-none">
      <input type="checkbox" checked={showDismissed} onChange={(e) => setShowDismissed(e.target.checked)} className="w-4 h-4 text-gray-600 rounded" />
      <span className="text-sm text-gray-700 font-medium">Показать уволенных</span>
    </label>
  );
};
