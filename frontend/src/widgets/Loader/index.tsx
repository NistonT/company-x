import { Loader2 } from "lucide-react";
import { m } from "motion/react";
export const Loader = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
        <span className="text-sm">Загрузка...</span>
      </m.div>
    </div>
  );
};
